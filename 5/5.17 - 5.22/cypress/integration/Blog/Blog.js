describe("Note app", function () {
  before(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    const user = {
      name: "test",
      username: "TEST",
      password: "0000",
    }
    const otherUser = {
      name: "user",
      username: "USER",
      password: "0000",
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.request("POST", "http://localhost:3003/api/users", otherUser)
    cy.visit("http://localhost:3000")
  })
  it("Login form is shown", function () {
    cy.contains("Login")
  })

  describe("Login", () => {
    it("user try to login with WRONG credentials", function () {
      cy.get('[name="username"]').type("WRONG")
      cy.get('[name="password"]').type("CREDENTIALS")

      cy.contains("Log In").click()
      cy.get(".warning")
        .contains("Wrong credentials")
        .should("have.css", "color", "rgb(255, 0, 0)")
    })
    it("user try to login with CORRECT credentials", function () {
      cy.get('[name="username"]').type("TEST")
      cy.get('[name="password"]').type("0000")

      cy.contains("Log In").click()
      cy.contains("test logged in")
    })
    after(() => {
      cy.contains("Logout").click({ timeout: 4000 })
    })
  })

  describe("when logged in ", () => {
    beforeEach(() => {
      cy.get('[name="username"]').type("TEST")
      cy.get('[name="password"]').type("0000")
      cy.contains("Log In").click()
      cy.contains("test logged in")
    })
    it("a blog can be created", () => {
      const title = "BlogTEST"
      const url = "https://TESTURL.com"

      cy.contains("Create new Blog").click()
      cy.get('[name="title"]').type(title)
      cy.get('[name="url"]').type(url)
      cy.get("#create").click()
      cy.get(".message")
        .contains(`The new Blog ${title} by test has been created`)
        .should("have.css", "color", "rgb(0, 128, 0)")
      cy.contains(title)
    })
  })
  // after(() => {
  //   cy.contains("Logout").click({ timeout: 4000 })
  // })
})

describe("Like", () => {
  it("a user can make a like to a blog", () => {
    cy.contains("View").click()
    cy.get(".likeBtn").click()
    cy.contains("Likes: 1")
  })
  after(() => {
    cy.contains("Logout").click({ timeout: 3000 })
  })
})

describe("Delete", () => {
  beforeEach(() => {

    cy.get('[name="username"]').type("USER")
    cy.get('[name="password"]').type("0000")
    cy.contains("Log In").click()
    cy.contains("user logged in")
  })
  it("a user CANNOT delete others blogs", () => {
    cy.contains("View").click()
    cy.contains("Author: test")
    cy.contains("Delete").click()
    cy.get(".warning").contains("Request failed with status code 400")
  })
})

describe("Delete", () => {
  beforeEach(() => {
    cy.contains("Logout").click({ timeout: 3000 })
    cy.get('[name="username"]').type("TEST")
    cy.get('[name="password"]').type("0000")
    cy.contains("Log In").click()
    cy.contains("test logged in")
  })
  it("a user CAN delete her blog", () => {
    cy.contains("View").click()
    cy.contains("Author: test")
    cy.contains("Delete").click()
    cy.get(".message").contains("Deleted")
  })
})
