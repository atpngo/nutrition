import { Dialog } from "@mui/material"
import { GiMeat, GiAvocado } from 'react-icons/gi'
import { FaBreadSlice } from 'react-icons/fa'
import { MdLocalFireDepartment } from 'react-icons/md'
import Badge from "./Badge"

function FoodDialog({open, handleClose, food})
{
    return (
        <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose} style={{zIndex: 51, border: 'none'}} PaperProps={{ style: {borderRadius: '20px'}}}>
            <div className='flex flex-col w-full colored-primary p-4 gap-3 rounded-[15px] border-0'>
                <img className='object-cover h-[200px] rounded-xl' src={food.image}/>
                <p className='colored-text text-xl sm:text-2xl'>{food.name}</p>
                {/* panel */}
                <div className='flex gap-3 justify-around p-2 rounded-xl colored-bg'>

                    <div className='flex items-center gap-1'>
                        <MdLocalFireDepartment size={35} className='text-calories hidden sm:flex'/>
                        <div className='flex flex-col justify-left'>
                            <p className='text-calories text-2xl'>{food.nutrition_info.calories}</p>
                            <p className='leading-3 text-sm font-medium colored-text'>Calories</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-1'>
                        <GiMeat size={35} className='text-protein hidden sm:flex'/>
                        <div className='flex flex-col justify-left'>
                            <p className='text-protein text-2xl'>{food.nutrition_info.protein}</p>
                            <p className='leading-3 text-sm font-medium colored-text'>Protein</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-1'>
                        <GiAvocado size={35} className='text-fats hidden sm:flex'/>
                        <div className='flex flex-col justify-left'>
                            <p className='text-fats text-2xl'>{food.nutrition_info.total_fat}</p>
                            <p className='leading-3 text-sm font-medium colored-text'>Fats</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-1'>
                        <FaBreadSlice size={35} className='text-carbohydrates hidden sm:flex'/>
                        <div className='flex flex-col justify-left'>
                            <p className='text-carbohydrates text-2xl'>{food.nutrition_info.total_carbohydrate}</p>
                            <p className='leading-3 text-sm font-medium colored-text'>Carbs</p>
                        </div>
                    </div>
                </div>

                {/* BADGES HERE */}
                <div className='flex justify-around colored-bg rounded-lg py-2'>
                    {food.badges.filter(val => !val.includes('Contains')).map((badge, index) => {
                        return <Badge key={index} size={25} className='colored-text' value={badge}/>
                    })}
                </div>

                {/* Allergens */}
                <div className='flex flex-col '>
                    <p className='colored-text'>Allergens</p>
                    <p className='text-[#9B9B9B] max-h-[125px] overflow-auto scrollable'>{food.allergens.join(', ')}</p>
                </div>

                {/* Ingredients */}
                <div className='flex flex-col '>
                    <p className='colored-text'>Ingredients</p>
                    <p className='text-[#9B9B9B] max-h-[125px] overflow-auto scrollable'>{food.ingredients}</p>
                </div>

            </div>
        </Dialog>
    )
}

export default FoodDialog;