import React from "react"
import anecdoteReducer, { createAn } from "../reducers/anecdoteReducer"
import deepFreeze from "deep-freeze"
import { useDispatch } from "react-redux"

describe("anecdoteReducer", () => {
  test("returns new state with anecdotes", () => {
    const dispatch = useDispatch()
    const state = []
    const action = "the app state is in redux store"

    deepFreeze(state)
    const newState = dispatch(createAn(action))

    expect(newState.action).toHaveLength(1)
    expect(newState.map((s) => s.content)).toContainEqual(action.payload)
  })

  test.skip("returns new state with action notes/toggleImportanceOf", () => {
    const state = [
      {
        content: "the app state is in redux store",
      },
      {
        content: "state changes are made with actions",
      },
    ]

    const action = {
      type: "notes/toggleImportanceOf",
      payload: 2,
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(2)

    expect(newState).toContainEqual(state[0])

    expect(newState).toContainEqual({
      content: "state changes are made with actions",
      important: true,
    })
  })
})
