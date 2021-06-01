import Head from 'next/head';

const BaseLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Notes</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      {children}
    </div>
  );
};

export default BaseLayout;