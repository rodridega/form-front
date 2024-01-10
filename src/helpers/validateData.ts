import { FormData } from "../types/FormData";

export function validateObject(formData: FormData): boolean {
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            const questionData = formData[key];
            if (questionData.questionNumber === 0) {
                return false;
            }
        }
    }
    return true;
}
