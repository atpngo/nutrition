import { useState } from 'react';
import Wrapper from '../components/Wrapper'
import FoodDialog from '../components/FoodDialog'
import { Tooltip } from '@mui/material';


function Test2()
{
    const [open, setOpen] = useState(false);
    const food = {
        "name": "Cream of Tomato Soup",
        "serving_size": "6 ozl",
        "nutrition_info": {
            "calories": "116",
            "total_fat": "8.1g",
            "saturated_fat": "5.1g",
            "trans_fat": "0.3g",
            "cholesterol": "24.7mg",
            "sodium": "227mg",
            "total_carbohydrate": "10.6g",
            "dietary_fiber": "2.2g",
            "sugars": "5.9g",
            "protein": "2.5g"
        },
        "ingredients": "Cream of Tomato Soup (Tomato Puree (Water, Tomato Paste, Citric Acid), Water, Heavy Whipping Cream, Italian Seasoning (Oregano, Thyme, Basil, Rosemary, Sage))",
        "allergens": [
            "Milk"
        ],
        "badges": [
            "Vegetarian Menu Option",
            "High Carbon Footprint",
            "Halal Menu Option"
        ],
        "image": "https://menu.dining.ucla.edu//Content/Images/RecipeImages/977029.jpg"
    }
    return (
        <Wrapper title="Test 2">
            <button className='generic-btn' onClick={() => setOpen(true)}>Click to Open</button>
            <FoodDialog open={open} handleClose={() => setOpen(false)} food={food}/>
        </Wrapper>
    )
}

export default Test2;