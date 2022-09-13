import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connection";
import User from '../../../models/userModel';

// body must contain
// -secret key
// -payload (which is an object that contains user object **MUST CONTAIN EMAIL)

export default async function deleteUser(req: NextApiRequest, res: NextApiResponse)
{
    switch (req.method)
    {
        case "POST":
        {
            try
            {
                if (req.body.key === process.env.SECRET_KEY && req.body.payload && req.body.payload.email)
                {
                    await connectMongo();
                    const data = await User.deleteOne(req.body.payload)
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