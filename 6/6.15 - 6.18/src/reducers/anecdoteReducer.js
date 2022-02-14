import { createSlice } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import anecdotesService from "../services/anecdotesService"

const initialState = []

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    updateAn(state, action) {
      const id = action.payload.id
      const findAnecdote = state.find((n) => n.id === id)

      const changedAn = {
        ...findAnecdote,
        votes: findAnecdote.votes + 1,
      }

      return state.map((anecdote) =>
        anecdote.id === id ? changedAn : anecdote
      )
    },
    appendAn(state, action) {
      return state.concat(action.payload)
    },
    setAn(state, action) {
      return action.payload
    },
  },
})

export const { appendAn, updateAn, setAn } = anecdoteReducer.actions

export const initialAn = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAn(anecdotes))
  }
}

export const createAn = (content) => {
  const newAn = {
    content: content,
    votes: 0,
  }
  return async (dispatch) => {
    const anecdote = await anecdotesService.createNew(newAn)
    dispatch(appendAn(anecdote))
  }
}

export const voteAn = (anecdt) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.udpateLikes(anecdt)
    dispatch(updateAn(anecdote))
  }
}

export default anecdoteReducer.reducer
