export const convertToNumber = (data: string): number => {

    const number = parseInt(data)

    if (isNaN(number)) {
        return 1
    } else {
        return number
    }

}