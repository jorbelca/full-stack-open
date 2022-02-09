import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Create from "../components/Create"
// 5.16 Una prueba para el nuevo formulario de blog. La prueba debe verificar que el formulario llama al controlador de eventos que recibió como argumentos con los detalles correctos cuando se crea un nuevo blog.

test("When a new form is submitted should target the functions that create the new object", () => {
  const createTitle = jest.fn()
  const createUrl = jest.fn()
  const component = render(
    <>
      <Create setTitle={createTitle} setUrl={createUrl} />
    </>
  )
  const title = component.container.querySelector("#title")
  const url = component.container.querySelector("#url")
  fireEvent.change(title, {
    target: { value: "TEST" },
  })
  fireEvent.change(url, {
    target: { value: "https://www.test.es" },
  })

  expect(createTitle).toHaveBeenCalled()
  expect(createUrl).toHaveBeenCalled()

  expect(createTitle.mock.calls[0][0]).toBe("TEST")
  expect(createUrl.mock.calls[0][0]).toBe("https://www.test.es")
})
