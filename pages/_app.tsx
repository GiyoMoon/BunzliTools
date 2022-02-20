import '../styles/global.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';

function BunzliTools({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default BunzliTools;
