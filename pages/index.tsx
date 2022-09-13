import SlidingButton from '../components/SlidingButton'
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

export default function Home() {

  const {data: session} = useSession();
  const router = useRouter();
  if (session)
  {
    router.push('/profile');
  }

  return (
    <div className="flex flex-col justify-around items-center h-screen">
      <img alt="logo" className="dark:drop-shadow-xl w-2/3 lg:w-96 hover:scale-[1.1] max-w-[300px] lg:max-w-[50vw] duration-300" src="/logo.svg"/>
      <img alt="food" className="dark:drop-shadow-xl w-2/3 lg:w-96 hover:scale-[1.1] max-w-[300px] lg:max-w-[50vw] duration-300" src="/food.svg"/>

        <motion.button 
          className="border-[5px] border-secondary rounded-[20px] w-[200px] px-6 py-4 text-2xl text-secondary flex items-center space-around justify-around bg-white" 
          whileHover={{scale: 1.1}}
          onClick={() => signIn("google", {callbackUrl: `${window.location.origin}/profile`})}  
          whileTap={{scale: 0.9}}
        >
            <FcGoogle size={35}/><p>SIGN IN</p>
        </motion.button>
    </div>
  )
  

}


