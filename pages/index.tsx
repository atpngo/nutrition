import type { NextPage } from 'next'
import SlidingButton from '../components/SlidingButton'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col lg:justify-center items-center h-screen gap-32">
      <img className="w-2/3 lg:w-96 hover:scale-[1.1] duration-300 mt-20 lg:mt-0" src="/logo.svg"/>
      <div className="flex flex-col lg:flex-row gap-5">
        <SlidingButton color="#3CCEEE">GET STARTED</SlidingButton>
        <SlidingButton color="#EEC73C">SIGN IN</SlidingButton>
      </div>
    </div>
  )
}

export default Home
