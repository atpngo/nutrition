import { useEffect } from "react";
import reactSelect from "react-select";
import Select from "react-select";
import styled from "styled-components";



function CustomSelect({options, multiselect})
{

    useEffect(() => {
        console.log(options);
    }, [options])

    return (
        <div className="">
            <select className={`${multiselect ? 'form-multiselect' : ''} w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500`} aria-label="Default select example">
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