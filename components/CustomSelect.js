import { useEffect } from "react";
import reactSelect from "react-select";
import Select from "react-select";
import styled from "styled-components";



function CustomSelect({options, disabled})
{

    return (
        <div className="">
            <select disabled={disabled} onChange={(e) => console.log(e.target.value)} defaultValue="null" className={"w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary-blue"} aria-label="Default select example">
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