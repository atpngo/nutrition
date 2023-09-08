import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import {useRouter} from 'next/router';
import {SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {

  const router = useRouter();
  const showNavBar = router.pathname === '/' ? false : true;
  return(
    <SessionProvider session={session}>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>BruinBites</title>
        <meta name="title" content="BruinBites" />
        <meta name="description" content="Utilizing UCLA dining hall data to help you figure out where to eat next!" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bruinbites.vercel.app/" />
        <meta property="og:title" content="BruinBites" />
        <meta property="og:description" content="Utilizing UCLA dining hall data to help you figure out where to eat next!" />
        <meta property="og:image" content="/bruinbites.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bruinbites.vercel.app/" />
        <meta property="twitter:title" content="BruinBites" />
        <meta property="twitter:description" content="Utilizing UCLA dining hall data to help you figure out where to eat next!" />
        <meta property="twitter:image" content="/bruinbites.png" />

        {/* <!-- Meta Tags Generated with https://metatags.io --> */}
        <title>BruinBites</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#333333"/>
        {/* <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F2F1F6"/> */}
      </Head>
      {showNavBar && <NavBar/>}
      <Component {...pageProps} />
    </SessionProvider>
  ) 
}

export default MyApp
