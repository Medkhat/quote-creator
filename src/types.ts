export type ResponseData = {
  source_amount: string
  target_amount: string
  fiat_blockchain_fee: string
  absolute_internal_fee: string
}
export type ResponseError = {
  error_code: string
  message: string
}
export type InitialState = {
  data?: ResponseData
  error?: ResponseError
  isFetching: boolean
}

export type Payload = {
  source_currency: "USD"
  target_currency: "USDC_EVMOS"
  source_amount?: string
  target_amount?: string
}

export enum ActionTypes {
  createQuote = "CREATE_QUOTE",
  responseError = "RESPONSE_ERROR",
  isFetching = "IS_FETCHING",
}

export type Action = { type: ActionTypes; payload: any }

export type AmountType = "source_amount" | "target_amount"
