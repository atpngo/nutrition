import { useSession } from "next-auth/react"
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
]

const Profile = () => {
    const {data: session} = useSession();
    
    
    if (session)
    {
        return (
            <div className="p-4 flex flex-col gap-4">
                <p className="text-4xl text-primary-blue font-semibold">Personal Info</p>
                
                {/* profile section */}
                <div className="flex gap-3 justify-center">
                    <img className="h-21 rounded-full" src={session.user.image} alt="Rounded avatar"/>
                    <div className="flex flex-col justify-center gap-2">
                        <p className="text-xl font-medium">{session.user.name}</p>
                        <p className="text-lg">{session.user.email}</p>
                    </div>
                </div>

                {/* male female buttons */}
                <div className="flex gap-5">
                    {/* replace these (look into radio buttons) */}
                    <SlidingButton color="gray" border='3px'>MALE</SlidingButton>
                    <SlidingButton color="gray" border='3px'>FEMALE</SlidingButton>
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

                <div className='flex flex-col'>
                    <label className='generic-label'>Allergies</label>
                    <CustomSelect options={allergies} multiselect={true}/>
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