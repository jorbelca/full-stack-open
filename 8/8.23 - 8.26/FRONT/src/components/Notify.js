import React from "react"

function Notify({ errorMessage }) {
  if (!errorMessage) return null
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        color: "red",
        position: "fixed",
        border: "1px solid red",
        width: "95%",
      }}
    >
      {errorMessage}
    </div>
  )
}

export default Notify
