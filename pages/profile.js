import { useSession, signOut } from "next-auth/react"
import Select from "react-select";
import SlidingButton from "../components/SlidingButton";
import CustomSelect from "../components/CustomSelect";


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
    {label: 'Sedentary: little or no exercise', value: 'sedentary'},
    {label: 'Light: exercise 1-3 times/week', value: 'light'},
    {label: 'Moderate: exercise 4-5 times/week', value: 'moderate'},
    {label: 'Active: daily exercise or intense exercise 3-4 times/week', value: 'active'},
    {label: 'Very Active: intense exercise 6-7 times/week', value: 'very_active'},
    {label: 'Extra Active: very intense exercise daily, or physical job', value: 'extra_active'},
]

const goals = [
    {label: 'Bulking', value: 'bulking'},
    {label: 'Maintaining', value: 'maintaining'},
    {label: 'Cutting', value: 'cutting'},

]

const Profile = () => {
    const {data: session} = useSession();
    
    
    if (session)
    {
        return (
            <div className="p-4 flex flex-col gap-4 mb-16">
                <div className="flex justify-between">
                    <p className="text-4xl text-primary-blue font-semibold">Profile</p>
                    <button className="text-lg text-primary-blue" onClick={() => signOut({callbackUrl: `${window.location.origin}`})}>Log Out</button>
                </div>
                {/* profile section */}
                <div className="flex gap-3 justify-center">
                    <img className="h-21 rounded-full" src={session.user.image} alt="Rounded avatar"/>
                    <div className="flex flex-col justify-center gap-2">
                        <p className="text-xl font-medium">{session.user.name}</p>
                        <p className="text-lg">{session.user.email}</p>
                    </div>
                </div>

                {/* male female buttons */}
                <div className="flex gap-5 justify-center">
                    {/* replace these (look into radio buttons) */}
                    <button className="generic-btn">Male</button>
                    <button className="generic-btn">Female</button>
                </div>

                {/* Age */}
                <div className="flex flex-col">
                    <label className="generic-label">Age (years)</label>
                    <input type="number" id="age" onWheel={(e) => {e.target.blur()}} className="generic-input" required/>
                </div>

                {/* Weight */}
                <div className="flex flex-col">
                    <label className="generic-label">Weight (lbs)</label>
                    <input type="number" id="weight" onWheel={(e) => {e.target.blur()}} className="generic-input" required/>
                </div>

                {/* height  */}
                <div className='flex flex-col'>
                    <label className="generic-label">Height</label>
                    <div className='flex items-center gap-2'>
                        <input type="number" id="height_ft" onWheel={(e) => {e.target.blur()}} className="generic-input" required/>
                        <label htmlFor="height_ft" className="generic-sublabel">ft</label>
                        <input type="number" id="height_in" onWheel={(e) => {e.target.blur()}} className="generic-input" required/>
                        <label htmlFor="height_in" className="generic-sublabel">in</label>
                    </div>
                </div>

                {/* Dietary Restrictions */}
                <div className='flex flex-col'>
                    <label className='generic-label'>Diet</label>
                    <CustomSelect options={diets}/>
                </div>

                {/* Allergies */}
                {/* <div className='flex flex-col'>
                    <label className='generic-label'>Allergies</label>
                    <CustomSelect options={allergies} multiselect={true}/>
                </div> */}

                {/* Activity Level */}
                <div className='flex flex-col'>
                    <label className='generic-label'>Activity Level</label>
                    <CustomSelect options={activityLevels}/>
                </div>

                {/* Goals */}
                <div className='flex flex-col'>
                    <label className='generic-label'>Goals</label>
                    <CustomSelect options={goals}/>
                </div>



            </div>
        )
    }
    else
    {
        return (
            <div>not logged in</div>
        )
    }
}

export default Profile;