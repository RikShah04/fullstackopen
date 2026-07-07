const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://rikhavs2004_db_user:${password}@cluster0.fmn1soj.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length < 4) {
    Person.find({}).then(result => {
        result.forEach(entry => {
            console.log(entry.name, entry.number)
        })
        mongoose.connection.close()
    })
    
    
}else {
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const newEntry = new Person({
        name: newName,
        number: newNumber
    })

    newEntry.save().then(result => {
        console.log(`added ${newName} number ${newNumber} to phonebook`)
        mongoose.connection.close()
    })
}

