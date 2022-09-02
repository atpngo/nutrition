import { MdLocalFireDepartment } from 'react-icons/md'
import { GiMeat, GiAvocado } from 'react-icons/gi'
import { FaBreadSlice } from 'react-icons/fa'
import { motion } from 'framer-motion'

// helper function to turn all caps => title case
function toTitleCase(str)
{
    return str.toLowerCase().replace(/[\])}[{(]/g, '').split(' ').map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}
function FoodItem({imgUrl, name, nutrition})
{
    const charLimit = 30;
    const formattedName = toTitleCase(name);
    
    /**
     * ISSUES
     * - ITEMS ARE NOT 200PX (most likely due to some flex thing)
     * 
     */

    return (
        <motion.div className={`w-fooditem select-none flex flex-col shadow-md shrink-0 grow-0 rounded-xl bg-white`}>
            <img className={`object-cover rounded-t-xl h-[100px]`} src={imgUrl}/>
            <div className={`flex flex-col text-sm text-center p-2 h-full gap-2 justify-center items-center`}>
                <p className={`text-md font-semibold`}>
                    {formattedName.length > charLimit ? formattedName.substring(0,charLimit).trim() + '...' : formattedName}
                </p>
                <div className='flex flex-col gap-1'>
                    {/* ROW 1 */}
                    <div className="flex gap-3 justify-center">
                        {/* Calories */}
                        <div className="flex items-center gap-1">
                            <MdLocalFireDepartment color="red"/>
                            <p className="text-gray-500">{nutrition.calories} cal </p>
                        </div>
                        {/* Protein */}
                        <div className="flex items-center gap-1">
                            <GiMeat color="#84FA70"/>
                            <p className="text-gray-500">{nutrition.protein}</p>
                        </div>
                    </div>

                    {/* ROW 2 - can add hidden to className to hide it*/}
                    <div className="">
                    <div className="flex gap-3 justify-center">
                        {/* Carbs */}
                        <div className="flex items-center gap-1">
                            <FaBreadSlice color="#D382FA"/>
                            <p className="text-gray-500">{nutrition.total_carbohydrate}</p>
                        </div>
                        {/* Fat */}
                        <div className="flex items-center gap-1">
                            <GiAvocado color="#F1DA9E"/>
                            <p className="text-gray-500">{nutrition.total_fat}</p>
                        </div>
                    </div> 
                    </div>
                </div>
            </div>
            
        </motion.div>
    )
}

export default FoodItem;