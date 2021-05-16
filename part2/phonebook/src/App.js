import React, { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Form = (props) => {
  return (
    <form>
      <div>
         {props.nameInput}
         {props.numberInput} 
      </div>
        <div>
          {props.addButton}
        </div>
    </form>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filtered, setFilter] = useState([])
  const [ listShown, setListShown] = useState([]) 

  useEffect(() => {
    personService.getAllPersons()
      .then(response => {
        setPersons(response)
        setListShown(response)
      })
  }, [])
 
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
      personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setListShown(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
      
    }
  }

  const filterList = (event) => {
    setFilter([])
    setFilter(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
    setListShown(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input name={'Filter phonebook: '} change={filterList}/>
      <h2>Add New Contact</h2>
      <Form heading={"Add a new contact"} 
        nameInput={<Input name={'name: '} change={handleNameChange} val={newName}/>}
        numberInput={<Input name={'number: '} change={handleNumberChange} val={newNumber}/>}
        addButton={<Button name='add' click={addNewPerson}/>}
      />
      <h2>Numbers</h2>
      <Numbers persons={listShown}/>
    </div>
  )
}

export default App