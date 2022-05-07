import { render, screen } from "@testing-library/react"
import Input from "../components/Input"

test("On initial render, value of input which amountType prop is source_amount should be 100.0", () => {
  render(<Input />)
  screen.debug()
})
