export const convertToNumber = (data: string): number => {

    const number = parseInt(data)
    

    if (isNaN(number) || number >5) {
        return 1
    } else {
        return number
    }

}