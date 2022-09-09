/*
Legend======================
Vegetarian Menu Option 
Vegan Menu Option 

Halal Menu Option 

Low Carbon Footprint 
High Carbon Footprint

Contains Peanuts 
Contains Tree Nuts
Contains Wheat 
Contains Gluten 
Contains Soy 
Contains Dairy 
Contains Eggs 
Contains Crustacean Shellfish 
Contains Fish 
*/

import { FaLeaf, FaGlobeAmericas } from 'react-icons/fa';
import { TbLetterV } from 'react-icons/tb';


const VeganIcon = ({size}) => {
    return(
        <div style={{width: size, height: size}} className='flex flex-col justify-center items-center'>
            <TbLetterV className='colored-text bg-[#00E532] rounded-full w-full h-full p-[4px] pl-[5px]'/>
        </div>

    )
}

const HalalIcon = ({size}) => {
    return (
        <div >
            <img style={{width: size}} className='bg-white rounded-full' src="https://logos-download.com/wp-content/uploads/2022/01/Halal_Logo-700x700.png"/>
        </div>
    )
}


function Badge({value, size})
{


    const icons = {
        'Vegetarian Menu Option': <FaLeaf size={size} color="#54C581"/>,
        'Vegan Menu Option': <VeganIcon size={size}/>,
        'Halal Menu Option': <HalalIcon size={size}/>,
        'Low Carbon Footprint': <FaGlobeAmericas size={size} color='#32ad10'/>,
        'High Carbon Footprint': <FaGlobeAmericas size={size} color='#c20632'/>,
        
    }

    // return an icon with a tooltip
    return (
        <div className='flex gap-2 items-center justify-center'>
            {icons[value]}
            <div className='colored-text'>
                <p className='flex text-[10px] sm:text-xl'>
                    {value.replace('Menu Option', '').replace('Footprint', '')}
                </p>
            </div>
        </div>
    )
}

export default Badge;