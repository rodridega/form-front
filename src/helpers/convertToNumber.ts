export const convertToNumber = (data: string): number | string => {

    const number = parseInt(data)

    if (isNaN(number)) {
        return data
    } else {
        return number
    }

}