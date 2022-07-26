import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { RiMentalHealthFill } from "react-icons/ri"
import { IoFastFoodOutline } from "react-icons/io5"
import { FiTarget } from "react-icons/fi"
import { GiForkKnifeSpoon } from "react-icons/gi"
import { motion } from "framer-motion";

const shrink = 0.8;
const iconSize = "text-4xl";

function IconWrapper({href, children})
{
    return(
        <Link href={href}>
            <motion.div whileTap={{scale: shrink}} className={iconSize}>
                {children}
            </motion.div>
        </Link>
    )
}

const NavBar = () => {
    const {data: session} = useSession();

    const [selected, setSelected] = useState('/profile');
    const [guestMode, setGuestMode] = useState(false);
    useEffect(() => {
        setSelected(window.location.pathname)
        if (localStorage.hasOwnProperty('guest'))
        {
            setGuestMode(JSON.parse(localStorage.getItem('guest')))
        }
    }, [])

    if (guestMode)
    {
        return <></>
    }

    return (
        <IconContext.Provider value={{}}>
            <div className="fixed inset-x-0 bottom-0 h-16 bg-light-bg dark:bg-dark-bg pb-2 border-t-2 border-gray-200 dark:border-[#5B5B5B] z-50">
                <div className="flex flex-row gap-3 h-full items-center justify-around">
                    <IconWrapper href="/menus">
                        <IoFastFoodOutline 
                            size="1em"
                            onClick={() => {setSelected('/menus')}}
                            color={selected === '/menus' ? '3CCEEE' : 'gray'}
                        />
                    </IconWrapper>
                    {/* <IconWrapper href="/mealtime">
                        <GiForkKnifeSpoon 
                            size="1em"
                            onClick={() => {setSelected('/mealtime')}}
                            color={selected === '/mealtime' ? '3CCEEE' : 'gray'}
                        />
                    </IconWrapper> */}
                    <IconWrapper href="/macros">
                        <FiTarget 
                            size="1em"
                            onClick={() => {setSelected('/macros')}}
                            color={selected === '/macros' ? '3CCEEE' : 'gray'}
                        />
                    </IconWrapper>
                    <IconWrapper href="/profile">
                        <CgProfile 
                            size="1em"
                            onClick={() => {setSelected('/profile')}}
                            color={selected === '/profile' ? '3CCEEE' : 'gray'}
                        />
                    </IconWrapper>
                </div>
            </div>
        </IconContext.Provider>
    )
}

export default NavBar;