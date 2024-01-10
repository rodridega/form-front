import { Dispatch, FC, SetStateAction, ChangeEvent } from 'react';
import { FormData } from '../../types/FormData';
import { User } from '../../context/AuthContext';

interface Props {
    label: string;
    name: string;
    questionNumber?: number;
    setFormData: Dispatch<SetStateAction<FormData>> | Dispatch<SetStateAction<User>>;
}

export const Input: FC<Props> = ({ label, name, setFormData, questionNumber }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (!questionNumber) {
            setFormData((prevState: any) => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value
                };
            });
        } else {
            setFormData((prevState: any) => {
                return {
                    ...prevState,
                    [e.target.name]: {
                        questionNumber: questionNumber,
                        responseValue: 1,
                        responseScore: 1
                    }
                };
            });
        }


    };

    return (
        <div > 
            <label className='text-vivvi font-semibold text-base lg:text-lg w-full'> {label} </label>
            <input className='rounded border border-vivvi h-8 w-full' name={name} onChange={handleInputChange} />
        </div>
    );
};
