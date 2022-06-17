import Head from 'next/head';
import 'antd/dist/antd.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-widths, initial-scale=1.0, user-scalable=no" />
    </Head>
    <Component {...pageProps} />
    
  </>
}

export default MyApp
