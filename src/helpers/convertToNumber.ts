export const convertToNumber = (data: string): number => {

    const number = parseInt(data)

    if (isNaN(number)) {
        return 0
    } else {
        return number
    }

}