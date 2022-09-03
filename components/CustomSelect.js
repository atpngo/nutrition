import React, { useEffect, useState } from "react";

function CustomSelect({options, disabled, setData, target, value})
{

    const [myValue, setValue] = useState(value);

    useEffect(() => {
        setValue(value);
    }, [value])

    const handleChange = (e) => 
    {
        setValue(e.target.value);
        setData((prevState) => {
            let copy = {...prevState};
            copy[target] = e.target.value;
            return copy;
        })
    }

    return (
        <div className="">
            <select value={myValue} disabled={disabled} onChange={handleChange} className={"generic-select max-w-full"} aria-label="Default select example">
                <option value={"null"} disabled hidden>Select an option...</option>
                {options.map(
                    (option) => {
                        if (option.label.length > 15)
                        {
                            let tmp = option.label.split(":").map(ele => ele.trim());
                            
                            return (
                                <React.Fragment key={option.value}>
                                <option key={option.value} value={option.value}>{tmp[0]}</option>
                                <option disabled key={tmp[1]} className="text-slate-500">{tmp[1]}</option>
                                </React.Fragment>
                            )
                        }
                        return (<option key={option.value} value={option.value}>{option.label}</option>)
                    }
                )}
            </select>
        </div>
    )
}

export default CustomSelect;