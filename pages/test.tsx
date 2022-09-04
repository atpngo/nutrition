import type { NextPage } from 'next';
import Banner from "../components/Banner";
import CustomDialog from '../components/CustomDialog';
import React, {useState} from "react";

import SlidingButton from '../components/SlidingButton';

const Test: NextPage = () => {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-center pt-10">
            <div onClick={() => setOpen(true)}>Click me</div>
            <CustomDialog open={open} handleClose={() => setOpen(false)}/>
        </div>
    )
}

export default Test;