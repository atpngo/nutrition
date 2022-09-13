import React, {useState, useEffect} from "react";
import Panel from "../components/Panel"
import Wrapper from '../components/Wrapper';
import CircularProgress from '../components/CircularProgress';
import FoodListItem from '../components/FoodListItem';
import MacroBar from '../components/MacroBar';
import { BiCog } from 'react-icons/bi'
import axios from 'axios';

const Test = () => {

    const [food, setFood] = useState([]);
    const [foodList, setFoodList] = useState({});
    const [finalList, setFinalList] = useState(null)
    const [loading, setLoading] = useState(true);

    const [nutrition, setNutrition] = useState({
      'calories': 0,
      'protein': 0,
      'fats': 0,
      'carbs': 0
    });

    useEffect(() => {
      setFood([]);
      setFoodList({});

      setNutrition({
        'calories': 0,
        'protein': 0,
        'fats': 0,
        'carbs': 0
      })

      axios.post('/api/dining/menu', {"dining_hall": "Rieber", "meal_period": "Dinner"})
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

    if (loading)
    {
      return <div>Loading...</div>
    }


    return (
        <Wrapper title="Test">
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

            <Panel title={'Nutritive Analysis'}>
              <div className='flex flex-row gap-4'>
                {/* calories */}
                <div className='flex flex-col items-center gap-2'>
                  <CircularProgress min={0} max={2000} current={nutrition.calories} 
                    iconSize={50} iconColor={"#EF476F"}
                    className="w-[100px] h-[100px]"
                  />
                  <p className='text-calories text-sm'>{nutrition.calories}/2000cal</p>
                </div>

                {/* linear progress bars */}
                <div className='flex flex-col w-full gap-4'>
                  {/* protein */}
                  <MacroBar value={nutrition.protein} max={208} textColor='text-protein' color='bg-protein' title='Protein' text='sm'/>
                  <MacroBar value={nutrition.fats} max={46} textColor='text-fats' color='bg-fats' title='Fats' text='sm'/>
                  <MacroBar value={nutrition.carbs} max={208} textColor='text-carbohydrates' color='bg-carbohydrates' title='Carbs' text='sm'/>
                  
                </div>
              </div>
            </Panel>

            <div className='flex flex-col bg-light-primary dark:bg-dark-primary rounded-xl p-4 max-w-[500px] shadow-sm w-full gap-3'>
              <div className='flex justify-between'>
                  <p className='text-secondary text-2xl font-semibold'>Lunch 11am-3pm</p>
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
                          return <FoodListItem key={index} setNutrition={setNutrition} food={item}/>
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
                  {/* <p className='text-secondary text-xl font-semibold'>The Kitchen</p> */}
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

export default Test;