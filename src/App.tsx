import { useCallback, useContext, useEffect } from "react"
import { quoteCreator } from "./api"
import "./App.css"
import Fees from "./components/Fees"
import Input from "./components/Input"
import { AppContext, AppProvider } from "./store"
import { AmountType } from "./types"

function App() {
  const { state, dispatch } = useContext(AppContext)

  // When user changes the input then this createQuote will be called
  const createQuote = useCallback(
    (value: string, amountType: AmountType) => {
      quoteCreator(
        {
          source_currency: "USD",
          target_currency: "USDC_EVMOS",
          [amountType]: value,
        },
        dispatch
      )
    },
    [dispatch]
  )

  // This useEffect invokes quoteCreator on first render of the app.
  // Because, on first render our source_amount is equal to "100.0"
  useEffect(() => {
    quoteCreator(
      {
        source_currency: "USD",
        target_currency: "USDC_EVMOS",
        source_amount: "100.0",
      },
      dispatch
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <h3 className="container-title">Select Your Amount</h3>
      <form>
        <Input
          blockTitle="You pay"
          currencyName="USD"
          currencyIcon="https://i.ya-webdesign.com/images/us-flag-clipart-png-5.png"
          value={state.data ? state.data.source_amount : "100.0"}
          createQuote={createQuote}
          amountType="source_amount"
        />
        <Fees />
        <Input
          blockTitle="You receive"
          currencyName="USDC EVMOS"
          currencyIcon="https://i.ya-webdesign.com/images/ethereum-coin-png-1.png"
          value={state.data ? state.data.target_amount : ""}
          createQuote={createQuote}
          amountType="target_amount"
        />
        <div className="container-message">{state.error?.message}</div>
        <button
          type="button"
          className={`form-submit__button ${
            state.isFetching ? "disabled" : ""
          }`}
          disabled={state.isFetching}
        >
          {state.isFetching ? "Loading..." : "Buy Now"}
        </button>
      </form>
    </div>
  )
}

const AppWrapper: React.FC = () => (
  <AppProvider>
    <App />
  </AppProvider>
)

export default AppWrapper
