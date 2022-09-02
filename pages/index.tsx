import SlidingButton from '../components/SlidingButton'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {

  const {data: session} = useSession();
  const router = useRouter();
  if (session)
  {
    router.push('/profile');
  }

  return (
    <div className="flex flex-col lg:justify-center items-center h-screen gap-32">
      <img alt="logo" className="w-2/3 lg:w-96 hover:scale-[1.1] max-w-[300px] lg:max-w-[50vw] duration-300 mt-20 lg:mt-0" src="/logo.svg"/>

      <div className="flex flex-col lg:flex-row gap-5">
        <motion.button 
          className="border-2 border-primary-blue rounded-lg px-10 py-4 text-2xl text-primary-blue" 
          onClick={() => signIn("google", {callbackUrl: `${window.location.origin}/profile`})}  
          whileTap={{scale: 0.9}}
        >
            LOGIN
        </motion.button>
      </div>
    </div>
  )
  

}


