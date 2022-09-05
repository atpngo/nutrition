import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connection";
import User from '../../../models/userModel';

// body must contain
// -secret key
// -email
// -payload (which is an object that contains changes to user object)

function calculateBMR(person: any)
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

// helper function to calculate nutritional info
function calculateNutrition(person: any)
{
    // person is an object that contains height, weight etc;

    // calculate RMR
    // need gender, weight (in kg), height (in cm), age, activity
    const BMR = calculateBMR(person);
    const RMR = BMR * parseFloat(person.activity);
    switch (person.goals)
    {
        case "bulking":
        {

        }
    }


}

export default async function getUser(req: NextApiRequest, res: NextApiResponse)
{
    switch (req.method)
    {
        case "POST":
        {
            try
            {
                if (req.body.key === process.env.SECRET_KEY && req.body.email && req.body.payload)
                {
                    await connectMongo();

                    // let payload = {...req.body.payload};
                    // payload.nutrition = calculateNutrition(req.body.payload);
                    

                    const data = await User.updateOne({email: req.body.email}, req.body.payload)
                    // console.log('RMR', calculateNutrition(req.body.payload))
                    return res.status(200).json(
                        {data}
                    )
                }
            }
            catch
            {
                return res.status(400).json(
                    {"error": "Invalid Key"}
                )
            }
            
        }
        default:
        {
            return res.status(400).json(
                {"error": "Invalid Key"}
            )
        }
    }
}