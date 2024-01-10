export interface FormData {
    [key: string]: any;
    // Aquí puedes agregar otras propiedades específicas de tu interfaz si las tienes.
}

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
