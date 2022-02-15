import React from "react"
import { connect } from "react-redux"
import { filterState } from "../reducers/filterReducer"

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    const inpt = event.target.value
    props.filterState(inpt)
  }

  const style = {
    marginTop: -41,
    marginLeft: 250,
    marginBottom: 20,
    borderRadius: 6,
  }

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { filterState })(Filter)
