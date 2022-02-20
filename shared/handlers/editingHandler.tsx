import { ChangeEvent, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface BunzliFile {
  fileName: string;
  fileContent: string;
  id: number;
  name: string;
  originalOwner: string;
  newProperties: Property[];
}

interface Property {
  id: number;
  key: string;
  value: string;
}

const EditingHandler = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<BunzliFile[]>([]);
  let localFiles: BunzliFile[] = [];
  const [searchValue, setSearchValue] = useState('');
  const [ownerValue, setOwnerValue] = useState('');
  const [coreValue, setCoreValue] = useState('');
  const [properties, setProperties] = useState<Property[]>([
    { id: 2, key: 'owner', value: '' },
    { id: 3, key: 'controller', value: '' },
    { id: 4, key: 'culture', value: '' },
    { id: 5, key: 'religion', value: '' },
    { id: 6, key: 'hre', value: '' },
    { id: 7, key: 'base_tax', value: '' },
    { id: 8, key: 'base_production', value: '' },
    { id: 9, key: 'base_manpower', value: '' },
    { id: 10, key: 'trade_goods', value: '' },
    { id: 11, key: 'capital', value: '' },
    { id: 12, key: 'is_city', value: '' },
    { id: 13, key: 'discovered_by', value: '' },
    { id: 1, key: 'add_core', value: '' },
  ]);

  const folderSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    localFiles = [];
    setSelectedFolder(undefined);
    const fileCount = e.target.files.length;
    for (let i = 0; i < fileCount; i++) {
      const file = e.target.files.item(i);
      if (!file) {
        continue;
      }
      const fileRegex = file.name.match(/^([0-9]+)-([a-zA-Z- \.]*)\.txt$/);
      if (!fileRegex) {
        continue;
      }

      let reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        if (reader.result) {
          const fileText = reader.result as string;
          const owner = fileText.match(/owner = (.*)/);
          if (!owner) {
            return;
          }

          localFiles.push({
            fileName: file.name,
            fileContent: fileText,
            id: parseInt(fileRegex[1]),
            name: fileRegex[2],
            originalOwner: owner[1],
            newProperties: []
          });

          if (i === fileCount - 1) {
            setFiles([...localFiles]);
            if (e.target.files && !selectedFolder) {
              setSelectedFolder(e.target.files.item(0)?.webkitRelativePath.split('/')[0]);
            }
          }
        }
      };
    }
  };

  const saveFiles = () => {
    var zip = new JSZip();
    for (const file of files.filter(f => f.newProperties.length > 0)) {
      let modifiedContent = file.fileContent;
      if (file.newProperties.some(np => np.key === 'add_core')) {
        modifiedContent = modifiedContent.replaceAll(/add_core = (.*)\r\n/g, '');
      }
      if (file.newProperties.some(np => np.key === 'discovered_by')) {
        modifiedContent = modifiedContent.replaceAll(/discovered_by = (.*)\r\n/g, '');
      }
      for (const mp of file.newProperties) {
        if (mp.key !== 'add_core' && mp.key !== 'discovered_by') {
          modifiedContent = modifiedContent.replace(new RegExp(`${mp.key} = (.*)`), `${mp.key} = ${mp.value}`);
        } else if (mp.key === 'add_core') {
          modifiedContent = `${mp.key} = ${mp.value}\r\n` + modifiedContent;
        } else if (mp.key === 'discovered_by') {
          modifiedContent = modifiedContent + `\r\n${mp.key} = ${mp.value}`;
        }
      }
      do {
        modifiedContent = modifiedContent.replaceAll('\r\n\r\n', '\r\n');
      } while (modifiedContent.match(/\r\n\r\n/));
      const buffer = Buffer.from(modifiedContent);

      const bomBuffer = Buffer.from('EFBBBF', 'hex');

      const reformedBuffer = Buffer.concat([bomBuffer, buffer]);
      zip.file(file.fileName, reformedBuffer);
    }
    zip.generateAsync({ type: 'blob' }).then((content) => saveAs(content, 'newCores.zip'));
  };

  const addProp = (key: string) => {
    const newProperties = [...properties];
    const highestId = properties.sort((a, b) => b.id - a.id)[0].id;

    newProperties.push({ id: highestId + 1, key, value: '' });
    setProperties(newProperties);
  };

  const removeProp = (prop: Property) => {
    const newProperties = properties.filter(p => p.id !== prop.id);
    setProperties(newProperties);
  };

  const addFile = (file: BunzliFile) => {
    const modifiedProps = properties.filter(p => p.value);

    const fileIndex = files.findIndex(f => f.id === file.id);
    const newFiles = [...files];
    newFiles[fileIndex].newProperties = modifiedProps.map(p => Object.assign({}, p));
    setFiles(newFiles);
  };

  const addAll = (filesToAdd: BunzliFile[]) => {
    const modifiedProps = properties.filter(p => p.value).map(p => Object.assign({}, p));

    const newFiles = [...files];
    for (const file of filesToAdd) {
      const fileIndex = files.findIndex(f => f.id === file.id);
      newFiles[fileIndex].newProperties = modifiedProps;
    }
    setFiles(newFiles);
  };

  const removeProps = (file: BunzliFile) => {
    const fileIndex = files.findIndex(f => f.id === file.id);
    const newFiles = [...files];
    newFiles[fileIndex].newProperties = [];
    setFiles(newFiles);
  };

  return {
    selectedFolder,
    folderSelected,
    searchValue,
    setSearchValue,
    ownerValue,
    setOwnerValue,
    coreValue,
    setCoreValue,
    files,
    saveFiles,
    properties,
    setProperties,
    addProp,
    removeProp,
    addFile,
    addAll,
    removeProps
  };
};

export default EditingHandler;
