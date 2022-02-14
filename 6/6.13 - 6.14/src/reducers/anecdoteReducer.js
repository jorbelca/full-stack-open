import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"

const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

const initialState = []

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAn(state, action) {
      const newAn = {
        content: action.payload,
        id: getId(),
        votes: 0,
      }
      anecdotesService.createNew(newAn)
      return state.concat(newAn)
    },

    voteAn(state, action) {
      const id = action.payload
      const findAnecdote = state.find((n) => n.id === id)

      const changedAn = {
        ...findAnecdote,
        votes: findAnecdote.votes + 1,
      }

      return state.map((anecdote) =>
        anecdote.id === id ? changedAn : anecdote
      )
    },
    initialAn(state, action) {
      action.payload.map((action) => {
        return state.push({
          content: action.content,
          id: action.id,
          votes: action.votes,
        })
      })
    },
  },
})

export const { createAn, voteAn, initialAn } = anecdoteReducer.actions
export default anecdoteReducer.reducer
