import React from "react"

function Notify({ errorMessage }) {
  if (!errorMessage) return null
  return (
    <div style={{ color: "red", position: "fixed", width: "100%" }}>
      {errorMessage}
    </div>
  )
}

export default Notify
