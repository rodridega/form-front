import { Dispatch, FC, SetStateAction } from "react"
import { FormData, Option } from "../../types/FormData"
import { convertToNumber } from "../../helpers/convertToNumber";

interface Props {
    options: Option[],
    label: string,
    name: string,
    setFormData: Dispatch<SetStateAction<FormData>>
}


export const Select: FC<Props> = ({ options, label, setFormData, name }) => {

    const handleSelectChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: convertToNumber(e.target.value) 
            };
        });
    };

    return (
        <div className="lg:flex lg:flex-col">
            <label className='text-vivvi font-semibold text-base lg:text-lg w-full'> {label} </label>
            <select className='rounded h-8 w-full' name={name} onChange={handleSelectChange}>
                <option defaultValue={''}></option>
                {options.map(option => <option value={option.value ? option.value : option.label} key={option.label}> {option.label} </option>)}
            </select>
        </div>
    )
}
