import '../styles/global.scss';
import type { AppProps } from 'next/app';

function BunzliTools({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default BunzliTools;
