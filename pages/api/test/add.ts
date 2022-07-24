import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../utils/connection";
import Test from '../../../models/testModel';

export default async function addTest(req: NextApiRequest, res: NextApiResponse)
{
    switch (req.method)
    {
        case "POST":
        {
            try
            {
                console.log('Connecting to MONGO');
                await connect();
                console.log('Connected to MONGO');
                console.log(req.body);

                console.log('Creating document');
                
                const test = await Test.create(req.body);
                console.log('Created document');

                // return a response
                res.json({test});

            }
            catch (error)
            {
                res.json({error});
            }
            break;
        }
        
        // not sure if to call get inside of getserversideprops, or to put get code inside getserverside props
        case "GET":
        {
            res.json({res:'HOWDY'});
            break;
        }
        // write other cases: put, delete, get
    }

    
}