import type { NextPage } from 'next';
import Banner from "../components/Banner";
import CustomDialog from '../components/CustomDialog';
import React, {useState} from "react";
import Panel from "../components/Panel"
import StyledBar from "../components/StyledBar";
import SlidingButton from '../components/SlidingButton';
import Wrapper from '../components/Wrapper';

const Test: NextPage = () => {

    const [open, setOpen] = useState(false);

    return (
        <Wrapper title="Test">
            <div className="flex flex-col items-center gap-4">
                <Panel title="Resting Metabolic Rate">
                    <div className="text-center">
                        <p className="text-calories text-5xl">2451 cal</p>
                    </div>
                </Panel>
                <Panel title="Daily Caloric Intake Goal">
                    <div className="text-center">
                        <p className="text-calories text-5xl">1950 cal</p>
                    </div>
                </Panel>

                <Panel title="Recommended Macros">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-around">
                            <div className="flex flex-col">
                                <p className="text-protein text-4xl">121g</p>
                                <p className="colored-text">Protein</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-fats text-4xl">51g</p>
                                <p className="colored-text">Fats</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-carbohydrates text-4xl">261g</p>
                                <p className="colored-text">Carbs</p>
                            </div>
                        </div>
                        {/* ratio bar */}
                        <div>
                            <StyledBar colors={['#06D6A0', '#FBC813', '#118AB2']} percentages={['23%', '69%']}/>
                        </div>
                    </div>
                </Panel>

                <Panel title="Body Mass Index">
                    <div className="text-center">
                        <p className="text-[#53E6EF] text-5xl">69.42 kg/m<sup>2</sup></p>
                    </div>
                </Panel>
            </div>
        </Wrapper>
        
    )
}

export default Test;