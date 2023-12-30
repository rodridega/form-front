export interface FormData {
    product: string,
    channel: number,
    location: number,
    stakeholder: number,
    knowTheCustomer: number,
    intentions: string,
    realStateDescription: string,
    realStateArea: string,
    realStateRoomsAndBaths: string,
    realStateProjectName: string,
    timeConstructionCompany: number,
    timeToStart: number,
    maxBudgetToInvest: number,
    budgetNow: number,
    interest: string,
    advantages: string
}

export interface Option {
    label: string,
    value?: number
}
