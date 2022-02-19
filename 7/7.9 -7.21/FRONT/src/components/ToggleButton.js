import { useImperativeHandle, useState } from "react"
import React from "react"

const ToggleButton = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })
  const toggleStyle = {
    padding: "10px",
  }
  return (
    <>
      <div style={toggleStyle}>
        <div className={"toggleOutside"} style={hideWhenVisible}>
          <button className="button is-light" onClick={toggleVisibility}>
            {props.label}
          </button>
        </div>
      </div>
      <div className={"toggleInside"} style={showWhenVisible}>
        {props.children}
        <button className="button is-light" onClick={toggleVisibility}>
          Hide
        </button>
      </div>
    </>
  )
})

export default ToggleButton

ToggleButton.displayName = "ToggleButton"
