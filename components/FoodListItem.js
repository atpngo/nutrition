import React, { useState, useEffect } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import FoodDialog from './FoodDialog'

const macros = ['total_carbohydrate', 'protein', 'total_fat']

function FoodListItem({food, setNutrition, showCounter})
{
    // props
    // nutritional info?
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // console.log('Food', typeof food, food)
    }, [])

    return (
        <div className='flex flex-row justify-between items-center'>
            <FoodDialog open={open} handleClose={() => setOpen(false)} food={food}/>
            <p 
                className='pl-5 text-black dark:text-[#DCDCDC] md:text-[1.3rem] text-[1rem] hover:cursor-pointer'
                onClick={() => setOpen(true)}
            >{food.name}</p>
            
            {showCounter && <div className='flex items-center'>
                <AiOutlineMinus size={20} className='colored-text hover:cursor-pointer'
                    onClick={() => {
                        if (value - 1 >= 0)
                        {
                            setValue(value - 1)
                            setNutrition((prevState) => {
                                let copy = {...prevState};
                                copy.calories -= parseFloat(food.nutrition_info.calories);
                                copy.protein -= parseFloat(food.nutrition_info.protein.replace('g', ''));
                                copy.fats -= parseFloat(food.nutrition_info.total_fat.replace('g', ''));
                                copy.carbs -= parseFloat(food.nutrition_info.total_carbohydrate.replace('g', ''));
                                return copy;
                            })
                        }
                    }}
                />
                <input value={value} className='food-input' onChange={(e) => {
                    let val = e.target.value;
                    if (val >= 0)
                    {
                        setValue(e.target.value);
                        // TODO??
                        // setNutrition((prevState) => {
                        //     let copy = {...prevState};
                        //     copy.calories += parseFloat(food.nutrition_info.calories)*value;
                        //     return copy;
                        // })
                    }
                }}/>
                <AiOutlinePlus size={20} className='colored-text hover:cursor-pointer'
                    onClick={() => {
                        setValue(value + 1);
                        setNutrition((prevState) => {
                            let copy = {...prevState};
                            copy.calories += parseFloat(food.nutrition_info.calories);
                            copy.protein += parseFloat(food.nutrition_info.protein.replace('g', ''));
                            copy.fats += parseFloat(food.nutrition_info.total_fat.replace('g', ''));
                            copy.carbs += parseFloat(food.nutrition_info.total_carbohydrate.replace('g', ''));
                            return copy;
                        })
                    }}
                />
            </div>}
        </div>
    )
}

export default FoodListItem;