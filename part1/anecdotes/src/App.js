import React, { useState } from 'react'

const Heading = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.name}</button>
    </div>
  )
}

const Statement = (props) => {
  return (
    <>
      <p>{props.quote}</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const heading1 = "Anecdote of the day"
  const heading2 = "Anecdote with most votes"
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(5).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const selectRandomQuote = () => {
    let randomNum = Math.floor(Math.random() * 5)
    while (randomNum === selected) {
      randomNum = Math.floor(Math.random() * 5)
    }
    setSelected(randomNum)
  }

  const addVote = () => {
    const copy = {...votes}
    copy[selected] += 1

    setVotes(copy)
    setMostVotes(getMostVotes(copy))
  }

  const getMostVotes = (vals) => {
    let max = 0
    let maxIndex = 0
    for (const [key, value] of Object.entries(vals)) {
      if (value >= max) {
        max = value
        maxIndex = key;
      }
    }
    return maxIndex
  }



  return (
    <div>
      <Heading name={heading1} />
      <Statement quote={anecdotes[selected]}/>
      <Statement quote={"Has " + votes[selected] + " vote/s"} />
      <Button onClick={selectRandomQuote} name={"Next Anecdote"}/>
      <Button onClick={addVote} name={"Vote"}/>
      <br></br>
      <Heading name={heading2} />
      <Statement quote={anecdotes[mostVotes]}/>
      <Statement quote={"Has " + votes[mostVotes] + " vote/s"} />
    </div>
  )
}

export default App