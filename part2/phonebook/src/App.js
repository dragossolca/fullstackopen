import { useEffect, useState } from 'react'
import Persons from './components/Persons.js'
import PersonForm from './components/PersonForm.js'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const filteredPersons = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length === 0) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
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


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with <input value={newFilter} onChange={handleFilterChange} />
        </div>
      <h2>add a new</h2>
      <PersonForm submitFunction={addPerson} 
                  fields={[ 
                            {value: {newName}, onChange: {handleNameChange}}, 
                            {value: {newNumber}, onChange: {handleNumberChange}}
                          ]}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
        
      
    </div>
  )
}

export default App