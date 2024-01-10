import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { FormData, Option } from "../../types/FormData"
import { convertToNumber } from "../../helpers/convertToNumber";

interface Props {
    options: Option[],
    label: string,
    name: string,
    multiply: number,
    questionNumber: number
    setFormData: Dispatch<SetStateAction<FormData>>
}


export const Select: FC<Props> = ({ options, label, setFormData, name, questionNumber, multiply }) => {

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: {
                    questionNumber: questionNumber,
                    responseValue: convertToNumber(e.target.value),
                    responseScore: convertToNumber(e.target.value) * multiply
                }
            };
        });
    };

    return (
        <div className="lg:flex lg:flex-col justify-between">
            <label className='text-vivvi font-semibold text-base lg:text-lg w-full'> {label} </label>
            <select className='rounded h-8 w-full border border-vivvi' name={name} onChange={handleSelectChange}>
                <option defaultValue={''}></option>
                {options.map(option => <option value={option.value ? option.value : option.label} key={option.label}> {option.label} </option>)}
            </select>
        </div>
    )
}
