import Head from 'next/head';
import { FunctionComponent } from 'react';

const Headers: FunctionComponent = () => {
  return (
    <Head>
      <title>Bünzli Tools</title>
      <meta name="title" content='Bünzli Tools' />
      <meta name="description" content='Bünzli Tools for Simon' />

      <meta property="og:title" content='Bünzli Tools' />
      <meta property="og:description" content='Bünzli Tools for Simon' />

      <meta property="twitter:title" content='Bünzli Tools' />
      <meta property="twitter:description" content='Bünzli Tools for Simon' />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#DA291C" />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" />
    </Head>
  );
};

export default Headers;
