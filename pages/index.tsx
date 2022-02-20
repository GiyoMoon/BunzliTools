import type { NextPage } from 'next';
import FileInput from '../components/styles/fileInput';
import TextInput from '../components/styles/textInput';
import EditingHandler from '../shared/handlers/editingHandler';

const Home: NextPage = () => {
  const {
    selectedFolder,
    folderSelected,
    searchValue,
    setSearchValue,
    ownerValue,
    setOwnerValue,
    files,
    saveFiles,
    properties,
    setProperties,
    addProp,
    removeProp,
    addFile,
    addAll,
    removeProps
  } = EditingHandler();

  return (
    <div className='flex flex-col justify-center items-center py-2'>
      <FileInput onChange={folderSelected} />
      {selectedFolder &&
        <>
          <p><span className='text-red-500'>{files.length}</span> files found in <span className='text-red-500'>{selectedFolder}</span></p>
          <div className='sm:w-1/2 w-full flex justify-between items-start mt-4'>
            <div className='flex flex-col justify-center items-center mx-4' style={{ minWidth: '288px' }}>
              <p className='text-red-500'>Unchanged files</p>
              <div className='my-1'>
                <TextInput value={searchValue} setValue={setSearchValue} placeholder='Search by id and name' />
              </div>
              <div className='my-1'>
                <TextInput value={ownerValue} setValue={setOwnerValue} placeholder='Core' />
              </div>
              {ownerValue &&
                <button className='bg-red-600 rounded-md px-2 py-1' onClick={() => addAll(files.filter(f => {
                  return f.newProperties.length === 0 &&
                    (f.name.toLowerCase().includes(searchValue) ||
                      f.id.toString().toLowerCase().includes(searchValue.toLowerCase())) &&
                    f.originalOwner.toLowerCase().includes(ownerValue.toLowerCase());
                }))}>
                  Add all
                </button>
              }
              <div className='overflow-y-auto' style={{ maxHeight: 'calc(100vh - 270px)' }}>
                {files.filter(f => {
                  return f.newProperties.length === 0 &&
                    (f.name.toLowerCase().includes(searchValue) ||
                      f.id.toString().toLowerCase().includes(searchValue.toLowerCase())) &&
                    f.originalOwner.toLowerCase().includes(ownerValue.toLowerCase());
                }).sort((a, b) => a.id - b.id).map((file, i) => (
                  <div key={i} className='flex flex-col bg-slate-800 hover:bg-slate-600 rounded-md p-2 cursor-pointer w-72 my-1 px-2' onClick={() => addFile(file)}>
                    <div className='flex justify-between'>
                      <p>ID:  <span className='text-red-500'>{file.id}</span></p>
                      <p>{file.name}</p>
                    </div>
                    <p>Owner: <span className='text-red-500'>{file.originalOwner}</span></p>
                  </div>
                ))}
              </div>
              {files.filter(f => f.newProperties.length === 0).length === 0 &&
                <p className='italic'>Nothing here</p>
              }
            </div>
            <div className='bg-slate-800 mt-2 rounded-md py-2 px-10'>
              <p className='text-xl font-bold text-center'>Modified values:</p>
              {properties.map(p => (
                <div key={p.id} className='flex justify-between my-2'>
                  <p className='mr-2'>{p.key}</p>
                  <div className='flex items-center'>
                    <TextInput value={p.value} setValue={(v) => {
                      const propertyIndex = properties.findIndex(prop => prop.id === p.id);
                      const newProperties = [...properties];
                      newProperties[propertyIndex].value = v;
                      setProperties(newProperties);
                    }} placeholder={`New ${p.key}`} />
                    {p.id === 1 &&
                      <button className='rounded-md px-2 py-1 ml-1 cursor-pointer bg-green-600 w-7 font-bold' onClick={() => addProp('add_core')}>
                        +
                      </button>
                    }
                    {p.id === 13 &&
                      <button className='rounded-md px-2 py-1 ml-1 cursor-pointer bg-green-600 w-7 font-bold' onClick={() => addProp('discovered_by')}>
                        +
                      </button>
                    }
                    {p.id !== 1 && p.id !== 13 && (p.key === 'add_core' || p.key === 'discovered_by') &&
                      <button className='rounded-md px-2 py-1 ml-1 cursor-pointer bg-red-600 w-7 font-bold' onClick={() => removeProp(p)}>
                        -
                      </button>
                    }
                    {p.key !== 'add_core' && p.key !== 'discovered_by' &&
                      <div className='w-8'>
                      </div>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className='flex flex-col justify-center items-center mx-4' style={{ minWidth: '288px' }}>
              <p className='text-green-500'>Files to modify</p>
              {files.filter(f => f.newProperties.length > 0).length > 0 &&
                <button className='rounded-md p-2 cursor-pointer bg-red-600 mt-4' onClick={saveFiles}>
                  Generate new files
                </button>
              }
              <div className='overflow-y-auto' style={{ maxHeight: 'calc(100vh - 270px)' }}>
                {files.filter(f => f.newProperties.length > 0).sort((a, b) => a.id - b.id).map((file, i) => (
                  <div key={i} className='flex flex-col bg-slate-800 hover:bg-slate-600 rounded-md p-2 cursor-pointer w-72 my-1 px-2' onClick={() => removeProps(file)}>
                    <div className='flex justify-between'>
                      <p>ID:  <span className='text-red-500'>{file.id}</span></p>
                      <p>{file.name}</p>
                    </div>
                    <p className='font-bold'>Modified values:</p>
                    {file.newProperties.map(np => (
                      <div key={np.id} className='flex justify-between'>
                        <p>{np.key}:</p>
                        <p className='text-green-500'>{np.value}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {files.filter(f => f.newProperties.length > 0).length === 0 &&
                <p className='italic'>Nothing here</p>
              }
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Home;
