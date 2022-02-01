const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("../tests/test_helper")
const api = supertest(app)

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})
test.skip("there are 2 notes", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body).toHaveLength(2)
})
test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/blogs")

  expect(response.body[0].title).toBe("Prueba1")
})

// 4.9

test("verification of the propiety id", async () => {
  const { body } = await api.get("/api/blogs")
  const id = body.map((r) => r.id.key)
  console.log(body)
  expect(id).toBeDefined(id)
})

test.skip("post a valid publication ", async () => {
  const newPublication = {
    title: "Test Publication",
    author: "testAdmin",
    url: "https://www.test.es",
    likes: Math.random() * 10,
  }

  await api
    .post("/api/blogs")
    .send(newPublication)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const publicationsAtEnd = await helper.publicationsInDB()
  expect(publicationsAtEnd).toHaveLength(publicationsAtEnd.length)

  const title = publicationsAtEnd.map((n) => n.title)

  expect(title).toContain("Test Publication")
})

test.skip("post a publication withouth likes with default value of 0 ", async () => {
  const newPublication = {
    title: "Test Likes",
    author: "testAdmin",
    url: "https://www.test.es",
    likes: "",
  }

  await api
    .post("/api/blogs")
    .send(newPublication)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const publicationsAtEnd = await helper.publicationsInDB()
  expect(publicationsAtEnd).toHaveLength(publicationsAtEnd.length)

  const likes = publicationsAtEnd.map((n) => n.likes)

  let result = likes[likes.length - 1]

  expect(result).toBe(0)
})
// POST
test.skip("post a publication withouth the title and the url ", async () => {
  const newPublication = {
    title: "",
    author: "testAdmin",
    url: "",
    likes: 2,
  }

  await api.post("/api/blogs").send(newPublication).expect(404)
})

// DELETE
describe("delete", () => {
  test.skip("if it goes ok ,returns 204", async () => {
    const all = await helper.publicationsInDB()
    const { id } = all[all.length - 1]
    console.log(id)
    await api.delete(`api/blogs/${id}`).expect(204)
  })
})

// UPDATE
describe("Update", () => {
  test.skip("post a publication withouth the title and the url ", async () => {
    const updatePublication = {
      likes: 2,
    }
  })
})

afterAll(() => {
  mongoose.connection.close()
})
