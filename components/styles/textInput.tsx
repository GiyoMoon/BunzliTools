import Image from 'next/image';
import { ChangeEvent, FunctionComponent } from 'react';

interface Props {
  value: string;
  setValue: (e: string) => void;
  placeholder: string;
}

const TextInput: FunctionComponent<Props> = ({ value, setValue, placeholder }) => {
  return (
    <div className="relative">

      <input
        className='bg-slate-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      {value &&
        <button className="absolute inset-y-0 right-0 flex items-center px-2" onClick={() => setValue('')}>
          <Image src={`/assets/svgs/close.svg`} height="24px" width="24px" alt="Clear Input Icon" />
        </button>
      }
    </div>
  );
};

export default TextInput;
