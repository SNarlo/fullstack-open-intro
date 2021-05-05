import React, { useState } from 'react'

const Numbers = (props) => {
  return (
    <div>
      {props.persons.map(person => 
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const checkIfIncludedAlready = (newName) => {
    let included;
    persons.forEach(person => {
      if (person.name.includes(newName)) {
        included = true
      } else {
        included = false
      }
    })
    return included
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }

    if (checkIfIncludedAlready(newPerson.name)) {
      window.alert(`${newPerson.name} + " is already added`)
      setNewName('')
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App