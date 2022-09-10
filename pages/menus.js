import { NextPage } from "next";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import Carousel from "../components/Carousel";
import FoodItem from "../components/FoodItem";
import PanelSkeleton from "../components/PanelSkeleton";
import Link from "next/link";

const MenusPage = () => {

    const [food, setFood] = useState({
        "DeNeve": [],
        "Rieber": [],
        "BCafe Bangers": []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setFood({
            "DeNeve": [],
            "Rieber": [],
            "BCafe Bangers": []
        })

        axios.post("/api/dining/menu", {"dining_hall": "Rieber", "meal_period": "Dinner"})
        .then(
            res => {
                let foodItems = res.data.data;
                let promises = []
                for (const item of foodItems["Bruin Wok"])
                {
                    promises.push(axios.post("/api/dining/food", {"url": item.url}));
                }

                for (const item of foodItems["Spice Kitchen"])
                {
                    promises.push(axios.post("/api/dining/food", {"url": item.url}));
                }

                for (const item of foodItems["Iron Grill"])
                {
                    promises.push(axios.post("/api/dining/food", {"url": item.url}));
                }

                // for (const item of foodItems["Sweets"])
                // {
                //     promises.push(axios.post("/api/dining/food", {"url": item.url}));
                // }


                // for (const item of [{url: 'https://menu.dining.ucla.edu/Recipes/077010/1'}, {url: "https://menu.dining.ucla.edu/Recipes/087073/1"}, {url: "https://menu.dining.ucla.edu/Recipes/125007/1"}])
                // {
                //     promises.push(axios.post("/api/dining/food", {"url": item.url}))
                // }

                Promise.all(promises).then
                (
                    res => {
                        res.map(
                            response => {
                                setFood((prevState) => {
                                    let copy = {...prevState};
                                    copy["DeNeve"].push(response.data.data);
                                    return copy;
                                })
                            }
                        );
                        setLoading(false);
                    }
                )
            }
        )
        .catch(
            err => console.log(err)
        )
    }, [])

    // if (loading)
    // {
    //     return(
    //         <Wrapper title={"Menus"}>
    //             <div className="flex flex-col items-ceenter">
    //                 Loading...
    //             </div>
    //         </Wrapper>
    //     )
    // }

    return(
        <Wrapper title={"Menus"}>
            <div className="">
                <div className="flex flex-col items-center">
                    {/* Menus from dining halls here */}
                    {/* <button onClick={() => console.log(food)}>Click Me</button> */}
                    <div className="flex flex-col">
                        <div className='flex justify-between pr-4 pb-1 items-center'>
                            <p className="pl-4 text-xl font-bold colored-text">DeNeve</p>
                            <Link href='/test'>
                                <p className="hover:cursor-pointer text-md text-primary-blue">See More</p>
                            </Link>
                        </div>
                        {!loading ? <Carousel length="w-screen">
                            {food["DeNeve"].map(
                                item => {
                                    if (item.name !== undefined)
                                    {
                                        return <FoodItem
                                            key={item.name}
                                            food={item}
                                        />
                                    }
                                }
                            )}
                        </Carousel>
                        :

                        <Carousel length="w-screen">
                            {/* {[1,2,3,4,5].map((val, index) => {
                                <PanelSkeleton key={index}/>
                            })} */}
                            <PanelSkeleton/>
                            <PanelSkeleton/>
                            <PanelSkeleton/>
                        </Carousel>
                        }   
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default MenusPage;