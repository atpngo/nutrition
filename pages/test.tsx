import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import FoodItem from '../components/FoodItem';
import Carousel from '../components/Carousel';
import { MdLocalFireDepartment } from 'react-icons/md'
import { GiMeat, GiAvocado } from 'react-icons/gi'
import { FaBreadSlice } from 'react-icons/fa'

import SlidingButton from '../components/SlidingButton';

const Test: NextPage = () => {



    return (
        <div className="flex flex-col items-center pt-10">
            {/* <div className="flex flex-row gap-5 mt-10 bg-pink-400">
                <FoodItem
                    imgUrl={"https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18555-ham-n-cheese-scrambled-eggs-760x580.jpg?ext=.jpg"}
                    name="Bruin Scramble (Ham and Cheese)"
                    nutrition={{calories: 205, protein: 9.5, carbohydrates: 3.8, fats: 16.8}}
                />
                <FoodItem
                    imgUrl={"https://marleyspoon.com/media/recipes/15221/main_photos/medium/SKU1044_hero-3fc73cc176c8fbe3a38bdc2c3a6419bb.jpg"}
                    name="PERUVIAN STYLE BEEF W/ POTATO"
                    nutrition={{calories: 198, protein: 10, carbohydrates: 6.7, fats: 14.4}}
                />
                <FoodItem
                    imgUrl={"https://www.seriouseats.com/thmb/mNm2bMbCEnyAECyieed2XKPTFtY=/458x458/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2012__02__20120227-tonkotsu-ramen-broth-pork-fat-26-9d4dabf71827455da94a194c17d19ec9.jpg"}
                    name="PORK RAMEN W/ SOY SAUCE BROTH TESTTESTTESTTESTTESTTESTTEST"
                    nutrition={{calories: 298, protein: 10.9, carbohydrates: 12.7, fats: 22.5}}
                />
            </div> */}

            <div className="flex flex-col pb-2">
                <p className="pl-2 pb-1 text-xl">DeNeve</p>
                <Carousel length={"w-screen"}>
                    <FoodItem
                        imgUrl={"https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18555-ham-n-cheese-scrambled-eggs-760x580.jpg?ext=.jpg"}
                        name="Bruin Scramble (Ham and Cheese)"
                        nutrition={{calories: 205, protein: 9.5, carbohydrates: 3.8, fats: 16.8}}
                    />
                    <FoodItem
                        imgUrl={"https://marleyspoon.com/media/recipes/15221/main_photos/medium/SKU1044_hero-3fc73cc176c8fbe3a38bdc2c3a6419bb.jpg"}
                        name="PERUVIAN STYLE BEEF W/ POTATO"
                        nutrition={{calories: 198, protein: 10, carbohydrates: 6.7, fats: 14.4}}
                    />
                    <FoodItem
                        imgUrl={"https://www.seriouseats.com/thmb/mNm2bMbCEnyAECyieed2XKPTFtY=/458x458/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2012__02__20120227-tonkotsu-ramen-broth-pork-fat-26-9d4dabf71827455da94a194c17d19ec9.jpg"}
                        name="PORK RAMEN W/ SOY SAUCE BROTH"
                        nutrition={{calories: 298, protein: 10.9, carbohydrates: 12.7, fats: 22.5}}
                    />

                    <FoodItem
                        imgUrl={"https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18555-ham-n-cheese-scrambled-eggs-760x580.jpg?ext=.jpg"}
                        name="Bruin Scramble (Ham and Cheese)"
                        nutrition={{calories: 205, protein: 9.5, carbohydrates: 3.8, fats: 16.8}}
                    />
                    <FoodItem
                        imgUrl={"https://marleyspoon.com/media/recipes/15221/main_photos/medium/SKU1044_hero-3fc73cc176c8fbe3a38bdc2c3a6419bb.jpg"}
                        name="PERUVIAN STYLE BEEF W/ POTATO"
                        nutrition={{calories: 198, protein: 10, carbohydrates: 6.7, fats: 14.4}}
                    />
                    <FoodItem
                        imgUrl={"https://www.seriouseats.com/thmb/mNm2bMbCEnyAECyieed2XKPTFtY=/458x458/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2012__02__20120227-tonkotsu-ramen-broth-pork-fat-26-9d4dabf71827455da94a194c17d19ec9.jpg"}
                        name="PORK RAMEN W/ SOY SAUCE BROTH"
                        nutrition={{calories: 298, protein: 10.9, carbohydrates: 12.7, fats: 22.5}}
                    />
                </Carousel>
            </div>

            <div className="flex flex-col">
                <p className="pl-2 pb-1 text-xl">DeNeve #2</p>
                <Carousel length={"w-screen"}>
                    <FoodItem
                        imgUrl={"https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18555-ham-n-cheese-scrambled-eggs-760x580.jpg?ext=.jpg"}
                        name="Bruin Scramble (Ham and Cheese)"
                        nutrition={{calories: 205, protein: 9.5, carbohydrates: 3.8, fats: 16.8}}
                    />
                    <FoodItem
                        imgUrl={"https://marleyspoon.com/media/recipes/15221/main_photos/medium/SKU1044_hero-3fc73cc176c8fbe3a38bdc2c3a6419bb.jpg"}
                        name="PERUVIAN STYLE BEEF W/ POTATO"
                        nutrition={{calories: 198, protein: 10, carbohydrates: 6.7, fats: 14.4}}
                    />
                    <FoodItem
                        imgUrl={"https://www.seriouseats.com/thmb/mNm2bMbCEnyAECyieed2XKPTFtY=/458x458/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2012__02__20120227-tonkotsu-ramen-broth-pork-fat-26-9d4dabf71827455da94a194c17d19ec9.jpg"}
                        name="PORK RAMEN W/ SOY SAUCE BROTH"
                        nutrition={{calories: 298, protein: 10.9, carbohydrates: 12.7, fats: 22.5}}
                    />

                    <FoodItem
                        imgUrl={"https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/18555-ham-n-cheese-scrambled-eggs-760x580.jpg?ext=.jpg"}
                        name="Bruin Scramble (Ham and Cheese)"
                        nutrition={{calories: 205, protein: 9.5, carbohydrates: 3.8, fats: 16.8}}
                    />
                    <FoodItem
                        imgUrl={"https://marleyspoon.com/media/recipes/15221/main_photos/medium/SKU1044_hero-3fc73cc176c8fbe3a38bdc2c3a6419bb.jpg"}
                        name="PERUVIAN STYLE BEEF W/ POTATO"
                        nutrition={{calories: 198, protein: 10, carbohydrates: 6.7, fats: 14.4}}
                    />
                    <FoodItem
                        imgUrl={"https://www.seriouseats.com/thmb/mNm2bMbCEnyAECyieed2XKPTFtY=/458x458/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2012__02__20120227-tonkotsu-ramen-broth-pork-fat-26-9d4dabf71827455da94a194c17d19ec9.jpg"}
                        name="PORK RAMEN W/ SOY SAUCE BROTH"
                        nutrition={{calories: 298, protein: 10.9, carbohydrates: 12.7, fats: 22.5}}
                    />
                </Carousel>
            </div>
        </div>
    )
}

export default Test;