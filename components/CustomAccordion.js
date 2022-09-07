import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useState } from "react";
import { MdExpandMore } from 'react-icons/md';

function CustomAccordion(props)
{
    const [open, setOpen] = useState(false);

    return(
        <Accordion 
            className="w-full" 
            open={open}
            icon={<MdExpandMore size={50} style={{transform: `${open ? 'rotate(180)' : ''}`, transition: '0.2s ease'}}/>}
        >
            <AccordionHeader className="colored-text" onClick={() => {setOpen(!open); console.log(open);}} >
                {props.title}
            </AccordionHeader>
            <AccordionBody className="colored-text border-4 border-pink-400 p-10">
                {props.children}
            </AccordionBody>
        </Accordion>
    )
}

export default CustomAccordion;