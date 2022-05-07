import { useContext } from "react"
import { AppContext } from "../store"

const Fees: React.FC = () => {
  const { state } = useContext(AppContext)

  let totalFee =
    Number(state.data?.fiat_blockchain_fee) +
    Number(state.data?.absolute_internal_fee)
  if (totalFee) {
    const splittedTotalFee = totalFee.toString().split(".")
    splittedTotalFee[1] = splittedTotalFee[1].substring(0, 3)
    totalFee = Number(splittedTotalFee.join("."))
  }

  return (
    <div className="fees-container">
      <h5 className="fees-container__title">Fees</h5>
      <div className="fees-wrapper d-flex">
        <div className="fees-wrapper__item d-flex">
          <span className="fees-wrapper__item-name">Network Fee</span>
          <span className="fees-wrapper__item-value">
            {state.data?.fiat_blockchain_fee || 0}$
          </span>
        </div>
        <div className="fees-wrapper__item d-flex">
          <span className="fees-wrapper__item-symbol">+</span>
        </div>
        <div className="fees-wrapper__item d-flex">
          <span className="fees-wrapper__item-name">C14 Fee</span>
          <span className="fees-wrapper__item-value">
            {state.data?.absolute_internal_fee || 0}$
          </span>
        </div>
        <div className="fees-wrapper__item d-flex">
          <span className="fees-wrapper__item-symbol">=</span>
        </div>
        <div className="fees-wrapper__item d-flex">
          <span className="fees-wrapper__item-name">Total Fee</span>
          <span className="fees-wrapper__item-value">{totalFee || 0}$</span>
        </div>
      </div>
    </div>
  )
}

export default Fees
