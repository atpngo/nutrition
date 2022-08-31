import { useEffect } from "react";
import reactSelect from "react-select";
import Select from "react-select";
import styled from "styled-components";



function CustomSelect({options, multiselect})
{

    return (
        <div className="">
            <select onChange={(e) => console.log(e.target.value)} defaultValue="null" className={"w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500"} aria-label="Default select example">
                <option value={multiselect ? [] : "null"} disabled hidden>Select an option...</option>
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