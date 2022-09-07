import { motion } from 'framer-motion';
import { usePrefersColorScheme } from '@anatoliygatt/use-prefers-color-scheme';
import React, { useEffect } from 'react';

function PanelSkeleton(props)
{
    const preferredColorScheme = usePrefersColorScheme();
    if (preferredColorScheme === 'dark')
    {
        return (
            <motion.div
                animate={{backgroundColor: ['#272727', '#1F1F1F', '#272727']}}
                transition={{duration: 1.5, repeat: Infinity, repeatDelay: 0, ease: 'easeInOut'}}
                className='w-fooditem select-none shadow-md h-[150px] rounded-xl shrink-0 bg-[#272727]'
            />
        )
    }
    return (
        <motion.div 
            animate={{backgroundColor: ['#FFF', '#EDEDED','#FFF']}}
            transition={{duration: 1.5, repeat: Infinity, repeatDelay: 0, ease: 'easeInOut'}}
            className='w-fooditem select-none shadow-md h-[150px] rounded-xl shrink-0 bg-[#FFF]'
        />
                
    )
}

export default PanelSkeleton;