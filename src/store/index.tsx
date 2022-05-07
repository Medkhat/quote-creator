import React, { createContext, Dispatch, useReducer } from "react"
import { Action, ActionTypes, InitialState } from "../types"

const initialState: InitialState = {
  isFetching: false,
}

const AppContext = createContext<{
  state: InitialState
  dispatch: Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.createQuote:
      return { ...state, data: { ...action.payload } }
    case ActionTypes.responseError:
      return { ...state, error: { ...action.payload } }
    case ActionTypes.isFetching:
      return { ...state, isFetching: action.payload }
    default:
      return state
  }
}

type AppProviderProps = {
  children?: React.ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
