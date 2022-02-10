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
      cy.login({ username: "TEST", password: "0000" })
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
    cy.login({ username: "USER", password: "0000" })
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
    cy.contains("Logout").click({ timeout: 2000 })
    cy.login({ username: "TEST", password: "0000" })
    cy.contains("test logged in")
  })
  it("a user CAN delete her blog", () => {
    cy.contains("View").click()
    cy.contains("Author: test")
    cy.contains("Delete").click()
    cy.get(".message").contains("Deleted")
  })
})

describe("Order", () => {
  beforeEach(() => {
    cy.login({ username: "TEST", password: "0000" })
    cy.newBlog({
      title: "PROVE_1",
      url: "https://www.running_full_speed.com",
      likes: 9,
    })
    cy.newBlog({
      title: "PROVE_2",
      url: "https://www.full_speed.com",
      likes: 90,
    })
    cy.newBlog({
      title: "PROVE_3",
      url: "https://www.speed.com",
      likes: 876567,
    })
    cy.newBlog({ title: "PROVE_4", url: "https://www.running.com", likes: 6 })
  })
  it("the blogs are ordered by the number of likes", () => {
    cy.contains("View").click()
    cy.get(".toggleInside")
      .invoke("text")
      .then((text) => {
        var fullText = text
        var pattern = /[0-9]+/g
        var number = fullText.match(pattern)
        console.log(number)
        const comprove = (arr) =>
          arr.join("") === arr.sort((a, b) => b - a).join("")
        if (comprove(number)) return true
        false
      })
      .should("be.true")
  })
})
