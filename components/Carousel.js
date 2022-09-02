import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";


function Carousel({children, length})
{

    const [width, setWidth] = useState(0);
    const carousel = useRef();

    useEffect(() => {
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth+8);
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth+8);
    }, [])

    return (    
        // outer carousel
        // fix bug with gap ??
        <motion.div 
            ref={carousel} 
            className={`overflow-hidden ${length} cursor-grab bg-white px-4 pb-2`}
        >
            {/* inner carousel */}
            <motion.div 
                drag={"x"} 
                dragConstraints={{right: 0, left: -width}}
                className="flex gap-3"
            >
                {children}
            </motion.div>
        </motion.div>
    )
}

export default Carousel;