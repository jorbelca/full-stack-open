import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import ToggleButton from "../components/ToggleButton"

describe("Toggle", () => {
  const btnLabel = "show"

  let component
  beforeEach(() => {
    component = render(
      <ToggleButton label={btnLabel}>
        <div>testDiv</div>
      </ToggleButton>
    )
  })

  test("render the div", () => {
    component.getByText("testDiv")
  })

  test("render div with display none", () => {
    const el = component.getByText("testDiv")
    expect(el.parentNode).toHaveStyle("display:none")
  })

  test("after clicking its children must be shown", () => {
    const btn = component.getByText(btnLabel)
    fireEvent.click(btn)
    const el = component.getByText("testDiv")
    expect(el.parentNode).not.toHaveStyle("display:none")
  })
})
