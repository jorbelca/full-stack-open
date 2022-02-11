const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const name = action.type.toLowerCase()
  switch (action.type) {
    case "GOOD":
      let g = { ...state }
      for (let [key, value] of Object.entries(state)) {
        if (name === key) {
          g.good++
        }
      }
      state = g
      return state

    case "OK":
      let f = { ...state }
      for (let [key, value] of Object.entries(state)) {
        if (name === key) {
          f.ok++
        }
      }
      state = f
      return state
    case "BAD":
      let b = { ...state }
      for (let [key, value] of Object.entries(state)) {
        if (name === key) {
          b.bad++
        }
      }
      state = b
      return state
    case "ZERO":
      let z = initialState
      
      state = z

      return state
    default:
      return state
  }
}

export default counterReducer
