import React, { useState } from 'react';
import {motion} from 'framer-motion'
import styled from 'styled-components';
const StyledDiv = styled.div`
    width: 100%;
    padding: 0.4rem;
    border-radius: 0.75rem;
    background: linear-gradient(to right, red 0%, red ${props => props.value}%, white ${props => props.value}%, white 100%);
    transition: 2s ease;
`

function LinearProgress({value, color, bg, p, borderRadius})
{

    return (
        <>
        <div className={`w-full ${bg} rounded-${borderRadius}`}>
            
            <div  
            className={`${color} p-1 rounded-${borderRadius}`}
            style={{
                'width': `${value}%`,
                'transition': '0.7s ease'
            }}/>

        </div>
        </>
        // <div className='w-full p-2 bg-pink-600 rounded-xl'>

        // </div>
    )
}

export default LinearProgress;