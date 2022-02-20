import { ChangeEvent, FunctionComponent, useEffect, useRef } from 'react';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FunctionComponent<Props> = ({ onChange }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  return (
    <label htmlFor='fileInput'>
      <div className='rounded-md p-2 cursor-pointer bg-red-600'>
        Select Bünzli Folder
      </div>
      <input className='hidden'
        id='fileInput'
        type='file'
        multiple
        onChange={onChange}
        ref={ref}
      />
    </label>
  );
};

export default FileInput;
