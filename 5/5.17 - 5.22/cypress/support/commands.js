Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then((response) => {
    localStorage.setItem("loggedUser", JSON.stringify(response.body))
  })
  cy.visit("http://localhost:3000")
})

Cypress.Commands.add("newBlog", ({ title, url, likes }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, url, likes },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedUser")).token
      }`,
    },
  })
  cy.visit("http://localhost:3000")
})


