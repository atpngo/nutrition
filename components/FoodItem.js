import { MdLocalFireDepartment } from 'react-icons/md'
import { GiMeat, GiAvocado } from 'react-icons/gi'
import { FaBreadSlice } from 'react-icons/fa'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import FoodDialog from './FoodDialog'

function FoodItem({imgUrl, name, nutrition, food})
{
    const charLimit = 30;
    const [open, setOpen] = useState(false);

    return (
        <>
            <FoodDialog food={food} open={open} handleClose={() => setOpen(false)}/>

            <motion.div 
                onClick={() => setOpen(true)}
                className={`w-fooditem select-none flex flex-col shadow-md shrink-0 grow-0 rounded-xl bg-light-primary dark:bg-dark-primary`}
            >
                <img className={`object-cover rounded-t-xl h-[100px]`} alt={`${food.name}`} src={food.image}/>
                <div className={`flex flex-col text-sm text-center p-2 h-full gap-2 justify-center items-center`}>
                    <p className={`text-md font-semibold text-black dark:text-white`}>
                        {food.name.length > charLimit ? food.name.substring(0,charLimit).trim() + '...' : food.name}
                    </p>
                    <div className='flex flex-col gap-1'>
                        {/* ROW 1 */}
                        <div className="flex gap-3 justify-center">
                            {/* Calories */}
                            <div className="flex items-center gap-1">
                                <MdLocalFireDepartment color="EF476F"/>
                                <p className="text-gray-500 dark:text-dark-subtitle">{food.nutrition_info.calories} cal </p>
                            </div>
                            {/* Protein */}
                            <div className="flex items-center gap-1">
                                <GiMeat color="#06D6A0"/>
                                <p className="text-gray-500 dark:text-dark-subtitle">{food.nutrition_info.protein}</p>
                            </div>
                        </div>

                        {/* ROW 2 - can add hidden to className to hide it*/}
                        <div className="">
                        <div className="flex gap-3 justify-center">
                            {/* Carbs */}
                            <div className="flex items-center gap-1">
                                <FaBreadSlice color="#BD4291"/>
                                <p className="text-gray-500 dark:text-dark-subtitle">{food.nutrition_info.total_carbohydrate}</p>
                            </div>
                            {/* Fat */}
                            <div className="flex items-center gap-1">
                                <GiAvocado color="#FBC813"/>
                                <p className="text-gray-500 dark:text-dark-subtitle">{food.nutrition_info.total_fat}</p>
                            </div>
                        </div> 
                        </div>
                    </div>
                </div>
                
            </motion.div>
        </>
    )
}

export default FoodItem;