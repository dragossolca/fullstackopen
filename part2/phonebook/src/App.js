import { useEffect, useState } from 'react'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import Notification from './components/Notification.js'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const filteredPersons = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    const foundPersons = persons.filter(person => person.name === newName)
    if (foundPersons.length === 0) {
      personService
        .create(personObject)
        .then(() => {
          setPersons(persons.concat(personObject))

          setErrorMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000) 
          
        })
    }

    else {
      window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)

      console.log(foundPersons)
      personService
        .update(foundPersons[0].id, personObject)
        .then((returnedPerson) => {
          const updatedPersons = persons.map(person => person.id !== personObject.id ? person : returnedPerson)
          setPersons(updatedPersons)

          setErrorMessage(
            `Updated ${personObject.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          .catch(error => {
            alert(
              `The person '${personObject.name}' was already deleted from server`
            )
            setPersons(persons.filter(person => person.id !== personObject.id))
          })
        })

      personService
        .getAll()
        .then(response => {
          setPersons(response.data)
        })
    }
    setNewName("")
    setNewNumber("")

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const deletePerson = (id, name) => {
    if (window.confirm("Delete " + name)) {
      const person = persons.find(person => person.id === id)
      personService
        .destroy(id, person)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(person => person.id !== id))
        })
    }


  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <PersonForm submitFunction={addPerson}
        fields={[
          { value: { newName }, onChange: { handleNameChange } },
          { value: { newNumber }, onChange: { handleNumberChange } }
        ]}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onDelete={deletePerson} />


    </div>
  )
}

export default App