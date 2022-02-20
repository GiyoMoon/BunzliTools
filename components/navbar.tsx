import Image from 'next/image';
import { FunctionComponent } from 'react';
import NavButton from './styles/navButton';

const Navbar: FunctionComponent = () => {

  return (
    <div className='h-16 w-full bg-slate-800 flex items-center'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center'>
          <Image src={'/assets/images/switzerland.png'} height={50} width={50} quality={100} />
          <p className='ml-4 text-3xl font-bold'>Bünzli Tools</p>
          <div className='ml-10 flex items-center'>
            <NavButton title='Kaff bearbeite' path='/' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
