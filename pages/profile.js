import { getSession, signOut, useSession  } from "next-auth/react"
import CustomSelect from "../components/CustomSelect";
import CustomInput from "../components/CustomInput";
import { motion } from "framer-motion";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import CustomDialog from "../components/CustomDialog";
import Loading from "../components/Loading";
import { useRouter } from "next/router";

function calculateBMI(person)
{
    const LB_TO_KG = 0.45359237;
    const IN_TO_CM = 2.54;
    const FT_TO_CM = 30.48;
    const weight = parseFloat(person.weight) * LB_TO_KG;
    const height = ((parseFloat(person.height_ft) * FT_TO_CM) + (parseFloat(person.height_in) * IN_TO_CM))/100;
    return (weight)/(height^2);
}

function calculateBMR(person)
{
    const LB_TO_KG = 0.45359237;
    const IN_TO_CM = 2.54;
    const FT_TO_CM = 30.48;
    const GENDER_CONSTANT = person.gender === "male" ? 5 : -161;
    const weight = parseFloat(person.weight) * LB_TO_KG;
    const height = (parseFloat(person.height_ft) * FT_TO_CM) + (parseFloat(person.height_in) * IN_TO_CM);
    const age = parseFloat(person.age);
    
    // return Basal Metabolic Rate
    return (10*weight) + (6.25*height) - (5*age) + GENDER_CONSTANT;
}

function calculateCalories(goals, RMR)
{
    if (goals === "maintaining")
    {
        return RMR;
    }
    else if (goals === "bulking")
    {
        return RMR*1.2;
    }
    else if (goals === "cutting")
    {
        return RMR*0.8;
    }
    return 0;
}

function calculateRatio(goals)
{
    
    if (goals === "maintaining")
    {
        return {'protein': '30', 'carbs': '40', 'fats': '30'}
    }
    else if (goals === 'bulking')
    {
        return {'protein': '30', 'carbs': '40', 'fats': '30'}
    }
    else if (goals === "cutting")
    {
        return {'protein': '40', 'carbs': '40', 'fats': '20'}
    }
}

const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
]

const diets = [
    {label: 'N/A', value: 'none'},
    {label: 'Vegan', value: 'vegan'},
    {label: 'Vegetarian', value: 'vegetatian'},
    {label: 'Pescatarian', value: 'pescatarian'},
]

const allergies = [
    {label: 'N/A', value: 'none'},
    {label: 'Peanut', value: 'peanut'},
    {label: 'Gluten', value: 'gluten'},
    {label: 'Egg', value: 'egg'},
    {label: 'Peanut', value: 'peanut2'},
    {label: 'Gluten', value: 'gluten2'},
    {label: 'Egg', value: 'egg2'},
    {label: 'Peanut', value: 'peanut3'},
    {label: 'Gluten', value: 'gluten3'},
    {label: 'Egg', value: 'egg3'},
    {label: 'Peanut', value: 'peanut4'},
    {label: 'Gluten', value: 'gluten4'},
    {label: 'Egg', value: 'egg4'},
]

const activityLevels = [
    {label: 'Sedentary', value: '1.2'},
    {label: 'Light', value: '1.375'},
    {label: 'Moderately Active', value: '1.55'},
    {label: 'Very Active', value: '1.725'},
    {label: 'Extra Active', value: '1.9'},
]

const goals = [
    {label: 'Weight Gain', value: 'bulking'},
    {label: 'Maintaining', value: 'maintaining'},
    {label: 'Weight Loss', value: 'cutting'},
]


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

const Profile = (props) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const {data: session} = useSession();
    const [visibleBanner, setVisibleBanner] = useState(false);
    const [userData, setUserData] = useState({
        'height_ft': '',
        'height_in': '',
        'age': '',
        'gender': 'null',
        'weight': '',
        'diet': 'null',
        'activity': 'null',
        'goals': 'null',
        'nutrition': {}
    });

    const [editing, setEditing] = useState(false);


    const saveChanges = async () => 
    {
        try 
        {
            let payload = {...userData};
            payload["nutrition"]['BMI'] = calculateBMI(userData).toString();
            const RMR = calculateBMR(userData) * parseFloat(userData.activity);
            payload["nutrition"]["RMR"] = RMR.toString();
            payload["nutrition"]["daily_calories"] = calculateCalories(userData.goals, RMR).toString();
            const ratio = calculateRatio(userData.goals);
            payload['nutrition']['protein'] = ratio['protein'];
            payload['nutrition']['fats'] = ratio['fats'];
            payload['nutrition']['carbs'] = ratio['carbs'];
            localStorage.setItem('user', JSON.stringify(payload));
            axios.post('/api/user/update', {key: process.env.NEXT_PUBLIC_SECRET_KEY, email: session.user.email, payload: userData})
            .then(
                res => {
                    setVisibleBanner(true)
                }
            )
            .catch(
                err => console.log(err)
            )
        }
        catch (error)
        {
            console.log(error);
        }
        

    }
    

    useEffect(() => {
        if (!session)
        {
            router.push('/');
        }
        if (localStorage.hasOwnProperty('user'))
        {
            setUserData(JSON.parse(localStorage.getItem('user')))
            setLoading(false);
        }
        else
        {
            getSession().then(
                session =>
                {
                    axios.post('/api/user/get', {key: process.env.NEXT_PUBLIC_SECRET_KEY, email: session.user.email})
                    .then(
                        res => {
                            // user doesn't exist
                            if (res.data.data === null)
                            {
                                axios.post('/api/user/create', {key: process.env.NEXT_PUBLIC_SECRET_KEY, payload: {email: session.user.email}})
                                .then(
                                    createRes => {
                                        setUserData(createRes.data.data)
                                        localStorage.setItem('user', JSON.stringify(createRes.data.data))  
                                        setLoading(false);
                                    }
                                )
                                .catch(
                                    err => console.error(err)
                                )
                            }
                            else
                            {
                                setUserData(res.data.data);
                                localStorage.setItem('user', JSON.stringify(res.data.data));
                                setLoading(false);
                            }
                        }
                    )
                    .catch(
                        err => console.error(err)
                    )
                }
            )
            .catch(err => {
                console.log(err);
            })
        }
        
    }, [])

    if (loading)
    {
        return (
            <Loading/>
        )
    }
    
    if (session)
    {
        return (
            <Wrapper title={"Profile"}>
                <div className="mx-auto max-w-[500px]">
                <div className="flex flex-col gap-3">



                    {/* profile section */}
                    <div className="flex gap-3 justify-center">
                        <img className="w-20 h-20 rounded-full" src={session.user.image} alt="Rounded avatar"/>
                        <div className="flex flex-col justify-center gap-2">
                            <p className="text-xl font-medium text-black dark:text-white">{session.user.name}</p>
                            <p className="text-lg text-black dark:text-white">{session.user.email}</p>
                        </div>
                    </div>
                    {visibleBanner && !editing && <Banner/>}


                    {/* Gender */}
                    <div className="flex flex-col">
                        <label className="generic-label">Gender</label>
                        <CustomSelect value={userData['gender']} setData={setUserData} target={"gender"} disabled={!editing} options={genders}/>
                    </div>

                    {/* Age */}
                    <div className="flex flex-col">
                        <label className="generic-label">Age (years)</label>
                        <CustomInput value={userData['age']} setData={setUserData} target={"age"} disabled={!editing}/>
                    </div>

                    {/* Weight */}
                    <div className="flex flex-col">
                        <label className="generic-label">Weight (lbs)</label>
                        <CustomInput value={userData['weight']} setData={setUserData} target={"weight"} disabled={!editing}/>
                    </div>

                    {/* height  */}
                    <div className='flex flex-col'>
                        <label className="generic-label">Height</label>
                        <div className='flex items-center gap-2'>
                            <CustomInput value={userData['height_ft']} setData={setUserData} target={"height_ft"} disabled={!editing}/>
                            <label htmlFor="height_ft" className="generic-sublabel">ft</label>
                            <CustomInput value={userData['height_in']} setData={setUserData} target={"height_in"} disabled={!editing}/>
                            <label htmlFor="height_in" className="generic-sublabel">in</label>
                        </div>
                    </div>

                    {/* Dietary Restrictions */}
                    <div className='flex flex-col'>
                        <label className='generic-label'>Diet</label>
                        <CustomSelect value={userData['diet']} setData={setUserData} target={"diet"}  disabled={!editing} options={diets}/>
                    </div>

                    {/* Allergies */}
                    {/* <div className='flex flex-col'>
                        <label className='generic-label'>Allergies</label>
                        <CustomSelect options={allergies} multiselect={true}/>
                    </div> */}

                    {/* Activity Level */}
                    <div className='flex flex-col'>
                        <div className='flex gap-1'>
                            <label className='generic-label'>Activity Level</label>
                            <button onClick={() => setOpen(true)}><AiOutlineQuestionCircle/></button>
                        </div>
                        <CustomSelect value={userData['activity']} setData={setUserData} target={"activity"}  disabled={!editing} options={activityLevels}/>
                        <CustomDialog open={open} handleClose={() => setOpen(false)}/>
                    </div>

                    {/* Goals */}
                    <div className='flex flex-col'>
                        <label className='generic-label'>Goals</label>
                        <CustomSelect value={userData['goals']} setData={setUserData} target={"goals"} disabled={!editing} options={goals}/>
                    </div>



                    <div className='flex gap-4 justify-center pt-4'>
                        {editing ? 
                            <motion.button whileHover={{scale: (validInputs(userData) ? 1.1 : 1)}} disabled={!validInputs(userData)} whileTap={{scale: (validInputs(userData) ? 0.9 : 1)}} className='disabled:border-gray-200 disabled:text-gray-200 border-2 border-primary-blue px-4 py-2 rounded-lg text-primary-blue' onClick={() => {setEditing(false); saveChanges();}}>SAVE CHANGES</motion.button>
                            :
                            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className='border-2 border-primary-blue px-4 py-2 rounded-lg text-primary-blue' onClick={() => {setEditing(true)}}>EDIT</motion.button>
                        }
                            {/* <motion.button whileTap={{scale: 0.9}} className='border-2 border-gray-400 px-4 py-2 rounded-lg text-gray-400' onClick={() => {console.log(userData)}}>DEBUG</motion.button> */}
                            {editing && <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className='border-2 border-red-500 px-4 py-2 rounded-lg text-red-500' onClick={() => {
                                axios.post('/api/user/delete', {key: process.env.NEXT_PUBLIC_SECRET_KEY, email: session.user.email, payload: userData})
                                .then(
                                    res => {
                                        localStorage.clear()
                                        signOut();
                                    }
                                )
                            }}>DELETE ACCOUNT</motion.button>}
                        
                    </div>

                    


                </div>
                </div>
            </Wrapper>
        )
    }
    else
    {
        return (
            <Wrapper title="Error">
                <div className='flex flex-col text-center justify-center h-[700px]'>
                    <p className='text-2xl colored-text'>Please log in!</p>
                </div>
            </Wrapper>
        )
    }
}

export default Profile;

// export async function getServerSideProps(context) 
// {
//     return {props: await getSession().then(
//         session =>
//         {
//             fetch('/api/user/get', 
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body:JSON.stringify({key: process.env.NEXT_PUBLIC_SECRET_KEY, email: session.user.email})
//             }
//             )
//             .then(
//                 res => {
//                     // user doesn't exist
//                     if (res.data.data === null)
//                     {
//                         fetch('/api/user/create', 
//                         {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             body:JSON.stringify({key: process.env.NEXT_PUBLIC_SECRET_KEY, payload: {email: session.user.email}})
//                         }
//                         )
//                         .then(
//                             createRes => { return createRes.data.data }
//                         )
//                     }
//                     else
//                     {
//                         return res.data.data;
//                     }
//                 }
//             )
//         }
//     )}
// }   