import { debounce } from "lodash"
import { Dispatch } from "react"
import { Action, ActionTypes, Payload } from "./types"

const createQuote = async (payload: Payload, dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionTypes.isFetching, payload: true })
  dispatch({ type: ActionTypes.responseError, payload: undefined })
  try {
    const response = await fetch("https://api-qjoa5a5qtq-uc.a.run.app/quotes", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    if (!response.ok) throw data
    else dispatch({ type: ActionTypes.createQuote, payload: data })
  } catch (error) {
    dispatch({ type: ActionTypes.responseError, payload: error })
  } finally {
    dispatch({ type: ActionTypes.isFetching, payload: false })
  }
}

// quoteCreator is debounced async function
export const quoteCreator = debounce(
  (payload: Payload, dispatch: Dispatch<Action>) => {
    createQuote(payload, dispatch)
  },
  300
)
