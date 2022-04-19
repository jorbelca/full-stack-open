const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("../tests/test_helper")
const api = supertest(app)

// beforeEach(async () => {
//   await Blog.deleteMany({})

//   const initial = helper.initialPublications.map((pub) => new Blog(pub))
//   const promiseArray = initial.map((i) => i.save())
//   await Promise.all(promiseArray)})
const token = async () => {
  const response = await api.post("/api/login").send({
    username: "test",
    password: "1234",
  })
  const token = response.body.token

  return token
}
jest.setTimeout(15000)
test("Token prove", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", "Bearer" + " " + (await token()))
    .expect(200)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set("Authorization", "Bearer" + " " + (await token()))
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("there are 2 notes", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", "Bearer" + " " + (await token()))

  expect(response.body).toHaveLength(2)
})
test("the first note is about HTTP methods", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", "Bearer" + " " + (await token()))

  expect(response.body[0].title).toBe("Prueba1")
})

// 4.9

test("verification of the propiety id", async () => {
  const { body } = await api
    .get("/api/blogs")
    .set("Authorization", "Bearer" + " " + (await token()))
  const id = body.map((r) => r.id.key)

  expect(id).toBeDefined()
})

test("post a valid publication ", async () => {
  const newPublication = {
    title: "Test Publication",
    author: "",
    url: "https://www.test.es",
    likes: Math.round(Math.random() * 100),
  }

  await api
    .post("/api/blogs")
    .send(newPublication)
    .set("Authorization", "Bearer" + " " + (await token()))
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const publicationsAtEnd = await helper.publicationsInDB()
  expect(publicationsAtEnd).toHaveLength(publicationsAtEnd.length)

  const title = publicationsAtEnd.map((n) => n.title)

  expect(title).toContain("Test Publication")
})

test("post a publication withouth likes with default value of 0 ", async () => {
  const newPublication = {
    title: "Test Likes",
    author: "testAdmin",
    url: "https://www.test.es",
    likes: "",
  }

  await api
    .post("/api/blogs")
    .send(newPublication)
    .set("Authorization", "Bearer" + " " + (await token()))
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const publicationsAtEnd = await helper.publicationsInDB()
  expect(publicationsAtEnd).toHaveLength(publicationsAtEnd.length)

  const likes = publicationsAtEnd.map((n) => n.likes)

  let result = likes[likes.length - 1]

  expect(result).toBe(0)
})
// POST
test("post a publication withouth the title and the url ", async () => {
  const newPublication = {
    title: "",
    author: "testAdmin",
    url: "",
    likes: 2,
  }

  await api
    .post("/api/blogs")
    .set("Authorization", "Bearer" + " " + (await token()))
    .send(newPublication)
    .expect(400)
})

// DELETE
describe("delete", () => {
  test("if it goes ok ,returns 204", async () => {
    const all = await helper.publicationsInDB()
    const { id } = all[all.length - 1]

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", "Bearer" + " " + (await token()))
      .expect(204)
  })
})

// UPDATE
describe("Update", () => {
  test("the likes of the last publication ", async () => {
    const all = await helper.publicationsInDB()
    const { id } = all[all.length - 1]
    const updatePublication = {
      likes: 2,
    }
    await api
      .put(`/api/blogs/${id}`, updatePublication)
      .set("Authorization", "Bearer" + " " + (await token()))

    const retrieve = await helper.publicationsInDB()
    const { likes } = retrieve[retrieve.length - 1]
    expect(likes === updatePublication.likes)
  })
})
// DELETE
describe("delete", () => {
  test("if it goes ok ,returns 204", async () => {
    const all = await helper.publicationsInDB()
    const { id } = all[all.length - 1]

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", "Bearer" + " " + (await token()))
      .expect(204)
  })
})

// POST
test("post a publication withouth the TOKEN ", async () => {
  const newPublication = {
    title: "",
    author: "testAdmin",
    url: "",
    likes: 2,
  }

  await api
    .post("/api/blogs")
    .set("Authorization", "Bearer" + " ")
    .send(newPublication)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})
