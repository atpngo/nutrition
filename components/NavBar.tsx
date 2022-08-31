import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { RiMentalHealthFill } from "react-icons/ri"
import { IoFastFoodOutline } from "react-icons/io5"



const NavBar = () => {
    const {data: session} = useSession();

    const [selected, setSelected] = useState('/profile');

    return (
        <IconContext.Provider value={{size: '2.5em'}}>
            <div className="fixed inset-x-0 bottom-0 h-16 bg-white">
                <div className="flex flex-row gap-3 h-full items-center justify-between px-10">
                    <Link href={'/menus'}>
                        <IoFastFoodOutline 
                            onClick={() => {setSelected('/menus')}}
                            color={selected === '/menus' ? '3CCEEE' : 'gray'}
                        />
                    </Link>
                    <Link href={'/macros'}>
                        <RiMentalHealthFill 
                            onClick={() => setSelected('/macros')}
                            color={selected === '/macros' ? '3CCEEE' : 'gray'}

                        />
                    </Link>
                    <Link href={'/profile'}>
                        <CgProfile 
                            onClick={() => setSelected('/profile')}
                            color={selected === '/profile' ? '3CCEEE' : 'gray'}

                        />
                    </Link>
                </div>
            </div>
        </IconContext.Provider>
    )
}

export default NavBar;