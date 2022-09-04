import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connection";
import User from '../../../models/userModel';

// body must contain
// -secret key
// -email
// -payload (which is an object that contains changes to user object)

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

                    const data = await User.updateOne({email: req.body.email}, req.body.payload)

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