import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import {useRouter} from 'next/router';
import {SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const showNavBar = router.pathname === '/' ? false : true;
  return(
    <SessionProvider>
      <Head>
        <title>BruinBites</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"}/>
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet"/>
      </Head>
      {showNavBar && <NavBar/>}
      <Component {...pageProps} />
    </SessionProvider>
  ) 
}

export default MyApp
