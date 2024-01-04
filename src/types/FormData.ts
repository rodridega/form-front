export interface FormData {
    product: QuestionData,
    channel: QuestionData,
    location: QuestionData,
    stakeholder: QuestionData,
    knowTheCustomer: QuestionData,
    intentions: QuestionData,
    realStateDescription: QuestionData,
    realStateArea: QuestionData,
    realStateRoomsAndBaths: QuestionData,
    realStateProjectName: QuestionData,
    timeConstructionCompany: QuestionData,
    timeToStart: QuestionData,
    maxBudgetToInvest: QuestionData,
    budgetNow: QuestionData,
    interest: QuestionData,
    advantages: QuestionData
}

export interface QuestionData {
    questionNumber: number,
    responseValue: number,
    responseScore: number
}

export interface Option {
    label: string,
    value?: number
}
