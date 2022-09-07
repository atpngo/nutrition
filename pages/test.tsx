import type { NextPage } from 'next';
import Banner from "../components/Banner";
import React, {useState} from "react";
import Panel from "../components/Panel"
import StyledBar from "../components/StyledBar";
import SlidingButton from '../components/SlidingButton';
import Wrapper from '../components/Wrapper';
import CircularProgress from '../components/CircularProgress';
import MacroBar from '../components/MacroBar';

import { BiCog } from 'react-icons/bi'

const Test: NextPage = () => {

    const [value, setValue] = useState(10);

    return (
        <Wrapper title="Test">
          <div className='flex flex-col gap-3 items-center'>
            <Panel title={'Nutritive Analysis'}>
              <div className='flex flex-row gap-4'>
                {/* calories */}
                <div className='flex flex-col items-center gap-2'>
                  <CircularProgress min={0} max={2000} current={1562} 
                    iconSize={50} iconColor={"#EF476F"}
                    className="w-[100px] h-[100px]"
                  />
                  <p className='text-calories text-sm'>1562/2000cal</p>
                </div>

                {/* linear progress bars */}
                <div className='flex flex-col w-full gap-4'>
                  {/* protein */}
                  <MacroBar textColor='text-protein' color='bg-protein' title='Protein' text='sm'/>
                  <MacroBar textColor='text-fats' color='bg-fats' title='Fats' text='sm'/>
                  <MacroBar textColor='text-carbohydrates' color='bg-carbohydrates' title='Carbs' text='sm'/>
                  
                </div>
              </div>
            </Panel>

            <div className='flex flex-col bg-light-primary dark:bg-dark-primary rounded-xl p-4 max-w-[500px] shadow-sm w-full'>
              <div className='flex justify-between'>
                  <p className='text-secondary text-2xl font-semibold'>Lunch 11am-3pm</p>
                  <BiCog size={30} color="1178B2"/>
              </div>

              {/* info */}

            </div>
        {/* <button className="colored-text border-2 border-primary-blue rounded-xl p-3" onClick={() => setValue(34)}>CLICK ME</button>  */}
          </div>
        </Wrapper>
        
    )
}

export default Test;