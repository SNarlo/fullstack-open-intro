import React, { useState } from 'react'

const Numbers = (props) => {
  return (
    <div>
      {props.persons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const Input = (props) => {
  return (
    <>
      <br></br>
      {props.name} <input onChange={props.change} value={props.val}/>
      <br></br>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <br></br>
      <button type='submit' onClick={props.click}>{props.name}</button>
    </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: '0123' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      name: newName,
      number: newNumber
    }
    

    if (checkIfIncludedAlready(newPerson.name)) {
      window.alert(`${newPerson.name} + " is already added`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <Input name={'name: '} change={handleNameChange} val={newName}/>
          <Input name={'number: '} change={handleNumberChange} val={newNumber}/>
        </div>
        <div>
          <Button name='add' click={addNewPerson}/>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App