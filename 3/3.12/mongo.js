const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://user:${password}@cluster0.sbsph.mongodb.net/persons?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: Number,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log(`Phonebook:`)
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
  //   setTimeout(() => process.exit(1), 10000000000)
}

if (process.argv.length > 4) {
  const entries = new Person({
    name: process.argv[3],
    number: parseInt(process.argv[4]),
    id: Math.random() * 10000,
  })

  entries.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook!`)
    mongoose.connection.close()
  })
}
