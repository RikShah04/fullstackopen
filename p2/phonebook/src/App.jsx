import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/people'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: "", number: ""})
  const [filter, setFilter] = useState("")
  const [lastAction, setLastAction] = useState('')


  useEffect(() => {
    console.log("here")
    personService.getAll()
    .then(response => setPersons(response))
  }, [])

  const handleNotChangeNum = ( event ) => {
    console.log(event.target.value)
    let temp = {name : newPerson.name, number: event.target.value }
    setNewPerson(temp)
  }

  const handleNotChangeName = ( event ) => {
    console.log(event.target.value)
    let temp = {name : event.target.value, number: newPerson.number }
    setNewPerson(temp)
  }
  
  const handleShownChange = (event) => {
    console.log(event.target.value)
    let newFilter = event.target.value
    setFilter(newFilter)
  }
  
  const addNewPerson = (event) => {
    event.preventDefault();
    const temp = { name: newPerson.name, number:newPerson.number, id: String(persons.length + 1)}
    if (persons.some(person => person.name === temp.name)){
      const existing = persons.find(person => person.name === temp.name)
      updateNumber(existing.id, { ...temp, id: existing.id })
      setLastAction("updated " + existing.name)
      setTimeout(() => setLastAction(''), 3000)
    }else{
     personService
      .create(temp)
      .then(response => {
        setPersons(persons.concat(response))
        setLastAction("added " + temp.name)
        setTimeout(() => setLastAction(''), 3000)
      })
    }
  }

  const deletePerson = ( id ) => {
    let curr = persons.find(person => person.id == id)
    if(confirm(`Delete ${curr.name}?`)){
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => id != person.id))
          setLastAction("deleted " + curr.name)
          setTimeout(() => setLastAction(''), 3000)
        })
        .catch( error => {
          setLastAction(`Information of '${curr.name}' has already been removed from the server`)
          setTimeout(() => setLastAction(''), 3000)
        })
    }
  }

  const updateNumber = ( id, newNum) => {
    let curr = persons.find(person => person.id == id)
    if (confirm(curr.name + " is already added to the phonebook, replace the old number with a new one?")){
      personService
        .update(id, newNum)
        .then(response => {
          setPersons(persons.map(person => person.id === id ? response : person))
        })
        .catch( error => {
          setLastAction(`Information of '${curr.name}' has already been removed from the server`)
          setTimeout(() => setLastAction(''), 3000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  console.log(persons)

  return (
    <div>
      <h2> Phonebook</h2>
      <Notification message={lastAction}/>
      <Filter onChange={handleShownChange}/>

      <h2>add a new</h2>

      <PersonForm
        onSubmit={addNewPerson}
        nameChange={handleNotChangeName}
        numChange={handleNotChangeNum}
      />

      <h2>Numbers</h2>

      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))} onClick={deletePerson}/>

    </div>
  )
}

export default App