import { useEffect, useState } from "react";

function CustomInput({disabled, setData, target, value})
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
            <input value={myValue} onChange={handleChange} disabled={disabled} type="number" onWheel={(e) => {e.target.blur()}} className="generic-input bg-light-primary dark:bg-dark-primary" required/>
        </div>
    )
}

export default CustomInput;