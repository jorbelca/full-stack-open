import React from "react"
import { useDispatch } from "react-redux"
import { filterState } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    event.preventDefault()
    const inpt = event.target.value
    dispatch(filterState(inpt))
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

export default Filter
