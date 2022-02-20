import { FunctionComponent } from 'react';
import Header from './header';
import Navbar from './navbar';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <main className='bg-slate-700' style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
    </>
  );
};

export default Layout;
