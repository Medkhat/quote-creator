import { ChangeEvent, useEffect, useState } from "react"
import { AmountType } from "../types"

interface CurrencyDropdownProps {
  currencyName: string
  currencyIcon: string
}

interface InputProps extends CurrencyDropdownProps {
  blockTitle: string
  value: string
  createQuote: (value: string, amountType: AmountType) => void
  amountType: AmountType
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  currencyName,
  currencyIcon,
}) => {
  return (
    <div className="currency-dropdown d-flex">
      <span className="currency-dropdown__name">{currencyName}</span>
      <img
        className="currency-dropdown__image"
        src={currencyIcon}
        alt={"CURRENCY"}
      />
      <span className="currency-dropdown__icon">&#x25BC;</span>
    </div>
  )
}

const Input: React.FC<InputProps> = (props) => {
  const {
    blockTitle,
    value,
    createQuote,
    amountType,
    currencyName,
    currencyIcon,
  } = props

  const [localInputValue, setLocalInputValue] = useState<string>(value)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.validity.valid) {
      setLocalInputValue(e.target.value)
      createQuote(e.target.value, amountType)
    }
  }

  // This useEffect will be invoked when we have new source_amount or target_amount
  useEffect(() => {
    setLocalInputValue(value)
  }, [value])

  return (
    <div className="input-container">
      <h5 className="input-container__title">{blockTitle}</h5>
      <div className="input-wrapper d-flex">
        <input
          type={"text"}
          className="input-wrapper__field"
          value={localInputValue}
          pattern="[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)"
          onChange={handleChange}
        />
        <CurrencyDropdown
          currencyName={currencyName}
          currencyIcon={currencyIcon}
        />
      </div>
    </div>
  )
}

export default Input
