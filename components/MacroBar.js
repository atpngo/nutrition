import LinearProgress from './LinearProgress';
import React, { useEffect, useState } from 'react';


function MacroBar({color, title, text, textColor, value, max})
{

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between'>
                <p className={`colored-text text-${text}`}>{title}</p>
                <p className={`${textColor} text-${text}`}>{Math.max(0,value).toFixed(1)}/{max}g</p>
            </div>
          <LinearProgress value={Math.min((value/max)*100, 100)} color={`${color}`} bg={'bg-light-bg'} p={'1'} borderRadius={'lg'}/>

        </div>
    )
}

export default MacroBar;