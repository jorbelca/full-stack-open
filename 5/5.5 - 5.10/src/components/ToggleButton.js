import { useState } from "react"

const ToggleButton = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const toggle = {
    padding: "10px",
  }
  return (
    <>
      <div style={toggle}>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{props.label}</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </>
  )
}

export default ToggleButton
