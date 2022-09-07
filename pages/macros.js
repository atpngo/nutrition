import Wrapper from "../components/Wrapper";
import Panel from "../components/Panel"
import StyledBar from '../components/StyledBar';
import React, { useEffect, useState } from 'react'

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

const Macros = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!(localStorage.hasOwnProperty('user') && validInputs(JSON.parse(localStorage.getItem('user')))))
        {
            setUserData(null);
        }
        else
        {
            setUserData(JSON.parse(localStorage.getItem('user')));
        }
    }, [])
    

    if (userData)
    {
        return (
            <Wrapper title={"Macronutrients"}>
                <div className="flex flex-col items-center gap-4">
                    <Panel title="Resting Metabolic Rate">
                        <div className="text-center">
                            <p className="text-calories text-5xl">{parseFloat(userData.nutrition.RMR).toFixed(0)} cal</p>
                        </div>
                    </Panel>
                    <Panel title="Daily Caloric Intake Goal">
                        <div className="text-center">
                            <p className="text-calories text-5xl">{parseFloat(userData.nutrition.daily_calories).toFixed(0)} cal</p>
                        </div>
                    </Panel>

                    <Panel title="Recommended Macros">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-around">
                                <div className="flex flex-col">
                                    <p className="text-protein text-4xl">{getMacroFromRatio(userData.nutrition.protein, userData.nutrition.daily_calories, 4)}g</p>
                                    <p className="colored-text">Protein</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-fats text-4xl">{getMacroFromRatio(userData.nutrition.fats, userData.nutrition.daily_calories, 9)}g</p>
                                    <p className="colored-text">Fats</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-carbohydrates text-4xl">{getMacroFromRatio(userData.nutrition.carbs, userData.nutrition.daily_calories, 4)}g</p>
                                    <p className="colored-text">Carbs</p>
                                </div>
                            </div>
                            {/* ratio bar */}
                            <div>
                                <StyledBar colors={['#06D6A0', '#FBC813', '#BD4291']} percentages={[`${userData.nutrition.protein}%`, `${100-parseFloat(userData.nutrition.carbs)}%`]}/>
                            </div>
                        </div>
                    </Panel>

                    <Panel title="Body Mass Index">
                        <div className="text-center">
                            <p className="text-[#53E6EF] text-5xl">{parseFloat(userData['nutrition']['BMI']).toFixed(1)} kg/m<sup>2</sup></p>
                        </div>
                    </Panel>
                </div>
            </Wrapper>
        )
    }
    else
    {
        return (
            <div>
                <Wrapper title={"Macronutrients"}>
                    <div className='flex flex-col text-center justify-center h-[700px]'>
                    <p className='text-2xl colored-text'>Please fill out your personal information on the Profile page!</p>
                    </div>
                </Wrapper>
            </div>
        )
    }
}

export default Macros;