const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/people')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response) => {
    if (request.method === 'POST'){
        return JSON.stringify(request.body)
    }
})


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people =>{
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(people => {
        response.json(people)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        let time = Date()
        response.send(
            `<div>
                <div> Phonebook has info for ${people.length} people</div>
                <div> ${time} </div>
            </div>`
        )
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id != id)
    response.status(204).end()
})

const generateId = () =>{
    const maxId = persons.length > 0
        ? Math.max(...persons.map(person => Number(person.id)))
        : 0
    return String(maxId + 1)

}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body || !body.name || !body.number){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    Person.find({name: body.name}).then(people => {
        if (people.length > 0){
            return response.status(400).json({
                error: 'name must be unique'
            })
        }else {
            const person = new Person({
                name: body.name,
                number: body.number
            })

            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }
    })

    
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})