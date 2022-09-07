import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import React, { useState } from 'react'

function CircularProgress({min, max, current, iconSize, iconColor, className})
{
    // props:
    // minvalue, maxvalue, currentValue
    // iconSize, iconColor
    // className

    return (
        <div className={className}>
            <CircularProgressbar counterClockwise={true} value={current} maxValue={max} minValue={min}
                strokeWidth={11}
                styles={buildStyles({
                    strokeLinecap: 'butt',
                    trailColor: '#F2F1F6',
                    pathColor: iconColor
                })}
            />
            <MdOutlineLocalFireDepartment size={iconSize} className='center-icon' color={iconColor}/>
        </div>
    )
}

export default CircularProgress;