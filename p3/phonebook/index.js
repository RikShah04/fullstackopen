const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/people')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// eslint-disable-next-line no-unused-vars
morgan.token('body', (request, response) => {
  if (request.method === 'POST'){
    return JSON.stringify(request.body)
  }
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  Person.find({}).then(people => {
    let time = Date()
    response.send(
      `<div>
        <div> Phonebook has info for ${people.length} people</div>
        <div> ${time} </div>
      </div>`
    )
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body || !body.name || !body.number){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  Person.find({ name: body.name })
    .then(people => {
      if (people.length > 0){
        return response.status(400).json({
          error: 'name must be unique'
        })
      }else {
        const person = new Person({
          name: body.name,
          number: body.number
        })

        return person.save().then(savedPerson => {
          response.json(savedPerson)
        })
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const newNumber = request.body.number
  Person.findById(request.params.id)
    .then(person => {
      if (!person){
        return response.status(404).end()
      }
      person.number = newNumber
      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})