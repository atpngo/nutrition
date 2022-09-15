import { NextPage } from "next";
import { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import Carousel from "../components/Carousel";
import FoodItem from "../components/FoodItem";
import PanelSkeleton from "../components/PanelSkeleton";
import Link from "next/link";



const getCurrentMealPeriod = () => {
    let mealPeriod;
    let time24h = new Date().toLocaleTimeString('en-US', {hour12: false});
    let hour = parseFloat(time24h.split(':')[0]);
    if (hour < 10)
    {
        mealPeriod = 'Breakfast';
    }
    else if (hour < 15)
    {
        mealPeriod = 'Lunch';
    }
    else
    {
        mealPeriod = 'Dinner'
    }
    // past 9pm => breakfast
    if (hour > 21)
    {
        mealPeriod = 'Breakfast';
    }

    return mealPeriod;
}

const MenusPage = () => {

    // Relevant locations
    const relevantLocations = {
        'DeNeve': ["The Front Burner", "The Kitchen", "The Grill"],
        'Rieber': ["Bruin Wok", "Spice Kitchen", "Iron Grill"],
        'BruinPlate': ["Freshly Bowled", "Harvest", "Simply Grilled"],
        'Epicuria': ["Psistaria", "Mezze", "Alimenti"]
    }

    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [locations, setLocations] = useState([]);
    const [period, setPeriod] = useState('');
    const [locationLoad, setLocationLoad] = useState(true);

    useEffect(() => {
        setPeriod(getCurrentMealPeriod() + ' Menus')
        setLocations(null);
        setLoading(true);
        setLocationLoad(true);
        
        let foodDict = {};

        // axios get the current open dining halls
        axios.get('/api/dining/schedule')
        .then(
            res => {
                const currentMealPeriod = getCurrentMealPeriod();
                const openDiningHalls = res.data.data[currentMealPeriod];
                setLocationLoad(false);
                setLocations(openDiningHalls);
                let diningHallMenuPromises = [];
                // get the menus of each dining hall open in the current meal period
                for (const openHall of openDiningHalls)
                {
                    diningHallMenuPromises.push(axios.post('/api/dining/menu', {'dining_hall': openHall, 'meal_period': currentMealPeriod}));
                }

                // after fetching all the data
                Promise.all(diningHallMenuPromises)
                .then(
                    res => {
                        // start constructing an object where the key is the dining hall
                        // the value is a list of objects that contain nutritional info for the relevant food in the dining hall
                        let promises = [];
                        res.forEach(response => {
                            if (typeof response.data.data === 'object' && JSON.stringify(response.data.data) !== "{}")
                            {
                                let foodItems = response.data.data;
                                let diningHall = response.data.name;
                                foodDict[diningHall] = [];
                                for (const location of relevantLocations[diningHall])
                                {
                                    // sometimes relevant locatio isn't
                                    if (foodItems.hasOwnProperty(location)){
                                        for (const item of foodItems[location])
                                        {
                                            let promise = axios.post('/api/dining/food', {'url': item.url});
                                            foodDict[diningHall].push(promise);
                                            promises.push(promise);
                                        }
                                    }   
                                    
                                }
                            }
                            else
                            {
                                setError(true);
                            }
                        })

                        // turn object of Location: [Promise Array] into Location: [Food Data array]
                        Promise.all(promises).then(
                            res => {
                                let final = {};
                                Object.keys(foodDict).forEach(
                                    (loc, index) => {
                                        let resolvedPromises = [];
                                        Promise.all(foodDict[loc]).then(
                                            promiseArr => {
                                                promiseArr.forEach(
                                                    (fulfilledPromise, index) => {
                                                        if (fulfilledPromise.data.data !== 'Error')
                                                        {
                                                            resolvedPromises.push(fulfilledPromise.data.data)
                                                        }
                                                    }
                                                )
                                            }
                                        )
                                        final[loc] = resolvedPromises;
                                    }
                                );
                                setFood(final);
                                setLoading(false);
                            }
                        )
                    }
                )
            }
        )
        
        // for each dining hall in the current/next meal period
        // do this? find an array of the most relevant locations
        // axios.post("/api/dining/menu", {"dining_hall": "Rieber", "meal_period": "Dinner"})
        // .then(
        //     res => {
        //         let foodItems = res.data.data;
        //         let promises = []
        //         for (const location of relevantLocations["Rieber"])
        //         {
        //             for (const item of foodItems[location])
        //             {
        //                 promises.push(axios.post("/api/dining/food", {"url": item.url}));
        //             }
        //         }
        


        //         // for (const item of [{url: 'https://menu.dining.ucla.edu/Recipes/077010/1'}, {url: "https://menu.dining.ucla.edu/Recipes/087073/1"}, {url: "https://menu.dining.ucla.edu/Recipes/125007/1"}])
        //         // {
        //         //     promises.push(axios.post("/api/dining/food", {"url": item.url}))
        //         // }

        //         // do the promise stuff like you did in test.js

        //         Promise.all(promises).then
        //         (
        //             res => {
        //                 res.map(
        //                     response => {
        //                         setFood((prevState) => {
        //                             let copy = {...prevState};
        //                             copy["DeNeve"].push(response.data.data);
        //                             return copy;
        //                         })
        //                     }
        //                 );
        //                 setLoading(false);
        //             }
        //         )
        //     }
        // )
        // .catch(
        //     err => console.log(err)
        // )
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
        <Wrapper title={period}>
            <div className="">
                <div className="flex flex-col items-center">
                    {/* Menus from dining halls here */}
                    {/* <button onClick={() => console.log(food)}>Click Me</button> */}
                    {locations && locations.map(
                        (item, index) => {
                            return (
                                <div key={index} className="flex flex-col">
                                    <div className='flex justify-between pr-4 pb-1 items-center'>
                                        <p className="pl-4 text-xl font-bold colored-text">{item}</p>
                                        <Link href='/mealtime'>
                                            <p  onClick={
                                                () => {
                                                    // set sessionStorage key here
                                                    sessionStorage.setItem('diningHall', item);
                                                }
                                            } className="hover:cursor-pointer text-md text-primary-blue">Eat Here</p>
                                        </Link>
                                    </div>
                                    {!loading ? <Carousel length="w-screen">
                                        {food[item] && food[item].map(
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
                                        {Array.from(Array(10).keys()).map((val, index) => {
                                            return <PanelSkeleton key={index}/>
                                        })}
                                        
                                    </Carousel>
                                    }   
                                </div>
                            )
                        }
                    )}
                    
                </div>
            </div>
        </Wrapper>
    )
}

export default MenusPage;