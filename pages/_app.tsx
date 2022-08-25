import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const showNavBar = router.pathname === '/' ? false : true;
  return(
    <>
      <Head>
        <title>BruinBites</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>
      {showNavBar && <NavBar/>}
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
