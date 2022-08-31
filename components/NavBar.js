import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { RiMentalHealthFill } from "react-icons/ri"
import { IoFastFoodOutline } from "react-icons/io5"
import { motion } from "framer-motion";

const shrink = 0.9;
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

    

    return (
        <IconContext.Provider value={{}}>
            <div className="fixed inset-x-0 bottom-0 h-16 bg-white pb-2">
                <div className="flex flex-row gap-3 h-full items-center justify-between px-10">
                    <IconWrapper href="/menus">
                        <IoFastFoodOutline 
                            size="1em"
                            onClick={() => {setSelected('/menus')}}
                            color={selected === '/menus' ? '3CCEEE' : 'gray'}
                        />
                    </IconWrapper>
                    <IconWrapper href="/macros">
                        <RiMentalHealthFill 
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