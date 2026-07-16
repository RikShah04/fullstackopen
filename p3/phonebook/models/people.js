const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('connecting to ', url)

mongoose.connect(url, {family: 4})
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

function validator (val) {
    var pattern = /^\d{2,3}-\d+$/
    return pattern.test(val)
}

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    number: {
        type: String,
        minLength: 8,
        validate: [validator, 'make sure phone number is a real phone number'],
        required: true
    }
})
  

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', phonebookSchema)