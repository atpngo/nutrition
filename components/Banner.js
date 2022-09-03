import React, {useState, useEffect} from "react";
import { AiOutlineCloseCircle } from "react-icons/ai"
import { AnimatePresence, motion } from "framer-motion";

function Banner(props)
{
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false);
        }, 3000)
    }, [])

    return (
        <>
            <AnimatePresence>
                {isVisible &&
                <motion.div 
                    key="banner"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.30, ease: "easeOut"}}
                    className="flex py-2 px-4 gap-2 items-center justify-between bg-green-200 border-2 border-green-400 rounded-xl banner"
                >
                    <p className="text-lg">Changes Saved!</p>
                    <AiOutlineCloseCircle color="#16a34a" size={20} onClick={() => {setIsVisible(false)}}/>
                </motion.div>
                }
            </AnimatePresence>
        </>
    )
    
}

export default Banner;