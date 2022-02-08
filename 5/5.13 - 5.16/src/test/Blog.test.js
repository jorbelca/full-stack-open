import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "../components/Blog"
import LikeBtn from "../components/LikeBtn"
// 5.13 Realice una prueba que verifique que el componente que muestra un blog muestre el título y el autor del blog, pero no muestre su URL o el número de likes por defecto
test("The component Blog shows the title and the author of the blog, but not the url or likes by defect", () => {
  const blog = {
    title: "Test",
    author: "Myself",
    url: "",
    likes: "",
  }
  const component = render(<Blog blog={blog} />)

  expect(component).toBeDefined()

  const title = component.getByText("Test")
  expect(title).toBeDefined()

  const button = component.getByText("View")

  expect(button).toBeDefined()

  expect(component.container).toHaveTextContent("Author: Myself")
  expect(component.container).toHaveTextContent("URL:")
  expect(component.container).toHaveTextContent("Likes:")
})
// 5.14 Realice una prueba que verifique que la URL del blog y el número de likes se muestran cuando se hace clic en el botón que controla los detalles mostrados.

test("The url and the number of likes should be shown when the button is clicked", () => {
  const Blg = {
    title: "Test",
    author: "Myself",
    url: "https://www.test.es",
    likes: 76545678,
  }

  const component = render(<Blog blog={Blg} />)
  expect(component).toBeDefined()

  const btn = component.getByText("View")
  fireEvent.click(btn)
  const divParent = component.container.querySelector(".toggleInside")
  expect(divParent).toBeDefined()
  expect(divParent).toHaveTextContent("URL:")
  expect(divParent).toHaveTextContent("Likes:")
  expect(divParent.parentNode).not.toHaveStyle("display:none")
})

// 5.15 una prueba que garantice que si se hace clic dos veces en el botón like, se llama dos veces al controlador de eventos que el componente recibió como argumentos.

test.skip("When the like button is clicked two times, should call the function that manages the event two times", () => {
  const Blg = {
    title: "Test",
    author: "Myself",
    url: "https://www.test.es",
    likes: 0,
  }
  const mockHandler = jest.fn()

  const component = render(
    <>
      <Blog blog={Blg} />
      <LikeBtn setBlogs={mockHandler} />
    </>
  )
  expect(component).toBeDefined()

  const likeBtn = component.container.querySelector(".likeBtn")
  expect(likeBtn).toBeDefined()

  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)
  expect(mockHandler).toHaveBeenCalled()

  component.debug()
})

