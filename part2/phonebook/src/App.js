import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import './App.css'

const Numbers = (props) => {
  return (
    <div>
      {props.persons.map(person => 
        <p key={person.name}>{person.name} {person.number} <Button id={person.name} name={props.name} click={props.click}/></p> 
      )}   
    </div>
  )
}

const Input = (props) => {
  return (
    <>
      {props.name} <input onChange={props.change} value={props.val}/>
      <br></br>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button id={props.id} type='submit' onClick={props.click}>{props.name}</button>
    </>
  )
}

const Message = (props) => {
  return (
    <>
      <p className={props.className}>{props.message}</p>
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
  const [ newNumber, setNewNumber ] = useState('')
  const [ listShown, setListShown ] = useState([]) 
  const [ message, setMessage ] = useState('')
  const [ messageClass, setMessageClass ] = useState('hidden')

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
      const personInPhonebook = persons.filter(person => person.name === newPerson.name)
      if (personInPhonebook.number !== newPerson.number) {
        window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)
        personService.update(personInPhonebook[0].id, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response))
          setListShown(persons.map(person => person.id !== response.id ? person : response))
          setMessageClass('good_message')
          setMessage(`Changed ${newPerson.name}'s number`)
          setTimeout(() => {
            setMessage('')
            setMessageClass('hidden')
          }, 2500)
        })
      }
      setNewName('')
      setNewNumber('')
    } 
    
    if (!(checkIfIncludedAlready(newPerson.name))) {
      personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setListShown(persons.concat(response))

        setMessageClass('good_message')
        setMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setMessage('')
          setMessageClass('hidden')
        }, 2500)

        setNewName('')
        setNewNumber('')
      })
    }
  }

  const filterList = (event) => {
    setListShown(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  const deleteContact = (event) => {
    event.preventDefault()
    
    const personDeleted = persons.find(person => person.name === event.target.id)
    const contactId = personDeleted.id

    window.confirm(`Delete ${personDeleted.name}?`)

    personService.deleteEntry(contactId)
    .then( 
      setPersons(persons.filter(person => person.id !== contactId))
    ).then(
      setListShown(persons.filter(person => person.id !== contactId)) // bad form 
    )
    .catch(error => {
      setMessageClass('bad_message')
      setMessage(`Information of ${personDeleted.name} has already been removed from the server`)
      setTimeout(() => {
        setMessage('')
        setMessageClass('hidden')
      }, 4000)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message className={messageClass} message={message}/>
      <Input name={'Filter phonebook: '} change={filterList}/>
      <h2>Add New Contact</h2>
      <Form heading={"Add a new contact"} 
        nameInput={<Input name={'name: '} change={handleNameChange} val={newName}/>}
        numberInput={<Input name={'number: '} change={handleNumberChange} val={newNumber}/>}
        addButton={<Button name='add' click={addNewPerson}/>}
      />
      <h2>Numbers</h2>
      <Numbers persons={listShown} name={'Delete'} click={deleteContact}/>
    </div>
  )
}

export default App