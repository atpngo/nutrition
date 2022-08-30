import SlidingButton from '../components/SlidingButton'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

  const {data: session} = useSession();
  const router = useRouter();
  if (session)
  {
    router.push('/test');
  }

  return (
    <div className="flex flex-col lg:justify-center items-center h-screen gap-32">
      <img className="w-2/3 lg:w-96 hover:scale-[1.1] max-w-[300px] lg:max-w-[50vw] duration-300 mt-20 lg:mt-0" src="/logo.svg"/>

      <div className="flex flex-col lg:flex-row gap-5">
        <SlidingButton color="#3CCEEE" onClick={() => signIn("google", {callbackUrl: `${window.location.origin}/profile`})}>SIGN IN</SlidingButton>
      </div>
    </div>
  )
  

}


