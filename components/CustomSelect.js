import { useEffect, useState } from "react";

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
            <select value={myValue} disabled={disabled} onChange={handleChange} className={"w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-blue"} aria-label="Default select example">
                <option value={"null"} disabled hidden>Select an option...</option>
                {options.map(
                    (option) => {
                        return (<option key={option.value} value={option.value}>{option.label}</option>)
                    }
                )}
            </select>
        </div>
    )
}

export default CustomSelect;