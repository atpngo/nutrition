import React, {useState, useEffect} from "react";
import Panel from "../components/Panel"
import Wrapper from '../components/Wrapper';
import CircularProgress from '../components/CircularProgress';
import FoodListItem from '../components/FoodListItem';
import Loading from '../components/Loading';
import MacroBar from '../components/MacroBar';
import { BiCog } from 'react-icons/bi'
import axios from 'axios';
import { useRouter } from "next/router";

function validInputs(state)
{
    // check state to make sure everything is filled out before allowing a user to save their changes
    const nullKeys = ['gender', 'diet', 'activity', 'goals'];
    const emptyKeys = ['height_ft', 'height_in', 'age', 'weight'];
    for (const key of nullKeys) 
    {
        if (state[key] === 'null')
        {
            return false
        }
    }
    for (const key of emptyKeys)
    {
        if (state[key] === '')
        {
            return false
        }
    }
    return true
}

function getMacroFromRatio(ratio, calories, macroConstant)
{
    // macroconstant == calories per macro
    return ((parseFloat(ratio)/100)*parseFloat(calories)/macroConstant).toFixed(0)
}

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

const Mealtime = () => {
    // fetch user data from localStorage

    const [food, setFood] = useState([]);
    const [foodList, setFoodList] = useState({});
    const [finalList, setFinalList] = useState(null)
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('');
    const [diningHall, setDiningHall] = useState(null);
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    const [nutrition, setNutrition] = useState({
      'calories': 0,
      'protein': 0,
      'fats': 0,
      'carbs': 0
    });

    const [values, setValues] = useState({
        'protein': '0',
        'fats': '0',
        'carbs': '0',
        'calories': '0',
    })

    useEffect(() => {
        let location;
        if (!(localStorage.hasOwnProperty('user') && validInputs(JSON.parse(localStorage.getItem('user')))))
        {
            setUserData(null);
        }
        else
        {
            let tmpUser = JSON.parse(localStorage.getItem('user'));
            setUserData(tmpUser);
            let calories = parseFloat(tmpUser.nutrition.daily_calories).toFixed(0)
            let protein = getMacroFromRatio(tmpUser.nutrition.protein, tmpUser.nutrition.daily_calories, 4);
            let fats = getMacroFromRatio(tmpUser.nutrition.fats, tmpUser.nutrition.daily_calories, 9);
            let carbs = getMacroFromRatio(tmpUser.nutrition.carbs, tmpUser.nutrition.daily_calories, 4);
            setValues({
                protein: protein,
                fats: fats,
                carbs: carbs,
                calories: calories
            })
        }

        if (sessionStorage.hasOwnProperty('diningHall'))
        {
            location = sessionStorage.getItem('diningHall');
            setDiningHall(location);
        }
        else
        {
            router.push('/menus');
        }

        setPeriod(getCurrentMealPeriod());
        setFood([]);
        setFoodList({});

        setNutrition({
        'calories': 0,
        'protein': 0,
        'fats': 0,
        'carbs': 0
        })

        let mp = getCurrentMealPeriod();

        axios.post('/api/dining/menu', {"dining_hall": location, "meal_period": mp})
        .then(
        res => {
            let tmpObj = {};
            const foodItems = res.data.data;
            let promises = [];
            for (const location of Object.keys(foodItems))
            {
            let tmp = [];
            for (const item of foodItems[location])
            {
                let promise = axios.post('/api/dining/food', {"url": item.url})
                tmp.push(promise)
                promises.push(promise);

            }

            tmpObj[location] = tmp;
            }

            Promise.all(promises).then(
            res => {
                let final = {};
                Object.keys(tmpObj).forEach(
                (loc, index) => {
                    let resolvedPromises = [];
                    Promise.all(tmpObj[loc]).then(
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
                )
                setFoodList(final);
                setLoading(false);
            }
            )
        }
        )
    }, [])

    if (loading || !diningHall)
    {
        return (
            <Loading/>
        )
    }

    // if (!userData)
    // {
    //     return (
    //         <div>
    //             <Wrapper title={"Macronutrients"}>
    //                 <div className='flex flex-col text-center justify-center h-[700px]'>
    //                 <p className='text-2xl colored-text'>Please fill out your personal information on the Profile page!</p>
    //                 </div>
    //             </Wrapper>
    //         </div>
    //     )
    // }


    return (
        <Wrapper title={period}>
          <div className='flex flex-col gap-3 items-center'>
            {/* <button className='generic-btn' onClick={() => console.log(foodList)}>DEBUG</button> */}
            {/* <button className='generic-btn' onClick={() => console.log(finalList)}>DEBUG</button> */}
            {/* <button className='generic-btn' onClick={() => {foodList['Bruin Wok'][0].then(res => console.log(res))}}>DEBUG</button> */}
            {/* <button className='generic-btn' onClick={() => console.log(food)}>DEBUG FOOD</button> */}
            {/* <button className='generic-btn' onClick={() => setNutrition({
              'calories': 0,
              'protein': 0,
              'fats': 0,
              'carbs': 0
            })}>RESET</button> */}

            {userData && <Panel title={'Nutritive Analysis'}>
              <div className='flex flex-row gap-4'>
                {/* calories */}
                <div className='flex flex-col items-center gap-2'>
                  <CircularProgress min={0} max={values.calories} current={nutrition.calories} 
                    iconSize={50} iconColor={"#EF476F"}
                    className="w-[100px] h-[100px]"
                  />
                  <p className='text-calories text-sm'>{nutrition.calories}/{values.calories}cal</p>
                </div>

                {/* linear progress bars */}
                <div className='flex flex-col w-full gap-4'>
                  {/* protein */}
                  <MacroBar value={nutrition.protein} max={values.protein} textColor='text-protein' color='bg-protein' title='Protein' text='sm'/>
                  <MacroBar value={nutrition.fats} max={values.fats} textColor='text-fats' color='bg-fats' title='Fats' text='sm'/>
                  <MacroBar value={nutrition.carbs} max={values.carbs} textColor='text-carbohydrates' color='bg-carbohydrates' title='Carbs' text='sm'/>
                  
                </div>
              </div>
            </Panel>}

            <div className='flex flex-col bg-light-primary dark:bg-dark-primary rounded-xl p-4 max-w-[1000px] shadow-sm w-full gap-3'>
              <div className='flex justify-between'>
                  <p className='text-secondary text-2xl font-semibold'>{diningHall}</p>
                  <BiCog size={30} color="1178B2"/>
              </div>
              { foodList ? Object.keys(foodList).map(
                (loc, index) => {
                  if (foodList[loc][0] && foodList[loc][0].hasOwnProperty('name'))
                  return (
                    <div key={index} className='flex flex-col'>
                      <p className='text-secondary text-xl font-semibold'>{loc}</p>
                      <div className='divide-y divide-[#EEEEEE] dark:divide-[#383838]'>
                        {foodList[loc].map((item, index) => {
                          return <FoodListItem key={index} setNutrition={setNutrition} food={item} showCounter={userData}/>
                        })}
                      </div>
                    </div>
                  )
                }
              ) :
              <div className='colored-text'>Loading...</div>}
              <div className='flex flex-col'>
                <p className='text-secondary text-xl'></p>
                {/* info */}
                <div className='divide-y divide-[#EEEEEE] dark:divide-[#383838]'>
                  {food.map((item, index) => {
                    return <FoodListItem key={index} setNutrition={setNutrition} food={item}/>
                  })}
                </div>
              </div>

            </div>
        {/* <button className="colored-text border-2 border-primary-blue rounded-xl p-3" onClick={() => setValue(34)}>CLICK ME</button>  */}
          </div>
        </Wrapper>
        
    )
}

export default Mealtime;