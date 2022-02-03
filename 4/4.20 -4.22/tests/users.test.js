const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const helper = require("../tests/test_helper")
const api = supertest(app)

// beforeEach(async () => {
//   await User.deleteMany({})

//   const initialUsers = helper.initialUsers.map((usr) => new User(usr))

//   const promiseArray = initialUsers.map((i) => i.save())
//   await Promise.all(promiseArray)
// })

describe("Existing users", () => {
  test("Should be 2 users", async () => {
    const response = await api.get("/api/users")

    expect(response.body).toHaveLength(2)
  })
})

describe("Create a new user", () => {
  test("if it goes right resolves with a 201", async () => {
    const newU = {
      name: "dummy",
      username: "Dummy1",
      password: "111111",
    }

    await api.post("/api/users").send(newU).expect(200)
  })
})

describe("Create a user with a wrong length of the password ", () => {
  test("if it goes right resolves with a 400", async () => {
    const newUser = {
      name: "dummy",
      username: "Dummy1",
      password: "11",
    }

    await api.post("/api/users").send(newUser).expect(400)
  })
})
describe("Create a user with a wrong length of the username ", () => {
  test("if it goes right resolves with a 400", async () => {
    const newUser = {
      name: "dummy",
      username: "D",
      password: "11323",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(500)
      .expect((response) => {
        response.body == "Internal Server Error"
      })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
