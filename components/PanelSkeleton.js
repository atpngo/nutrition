import { motion } from 'framer-motion';


function PanelSkeleton(props)
{
    return (
        <motion.div 
        animate={{ backgroundColor: ['#272727', '#1F1F1F', '#272727']}}
        transition={{duration: 1.5, repeat: Infinity, repeatDelay: 0, ease: 'easeInOut'}}
        className='w-fooditem select-none shadow-md h-[150px] rounded-xl shrink-0'>

        </motion.div>
    )
}

export default PanelSkeleton;