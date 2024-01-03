import { Dispatch, FC, SetStateAction } from 'react'
import { FormData } from '../../types/FormData';
import { User } from '../../context/AuthContext';

interface Props {
    label: string,
    name: string,
    setFormData: Dispatch<SetStateAction<FormData>> | Dispatch<SetStateAction<User>>
}

export const Input: FC<Props> = ({label, name, setFormData}) => {

    const handleInputChange = (e) => {
        setFormData((prevState: FormData | User) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            };
        });
    };

    return (
        <div>
            <label className='text-vivvi font-semibold text-base lg:text-lg w-full'> {label} </label>
            <input className='rounded h-8 w-full' name={name} onChange={handleInputChange} />
        </div>
    )
}
