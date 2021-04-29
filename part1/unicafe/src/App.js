import React, {useState} from 'react'

const Content = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Good: {props.bad}</p>
    </div>
  )
}

const App = () => {
  const title = "Give feedback"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodButtonHandler = (value) => {
    setGood(value += 1)
  }
  
  const neutralButtonHandler = (value) => {
    setNeutral(value += 1)
  }
  
  const badButtonHandler = (value) => {
    setBad(value += 1)
  }

  return (
    <div className="App">
      <h1>{title}</h1>
      <button onClick={() => goodButtonHandler(good)}>Good</button>
      <button onClick={() => neutralButtonHandler(neutral)}>Neutral</button>
      <button onClick={() => badButtonHandler(bad)}>Good</button>
      < Content
      good={good}
      neutral={neutral}
      bad={bad}
      />
    </div>
  );
}

export default App;
