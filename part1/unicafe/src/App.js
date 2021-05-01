import React, {useState} from 'react'

const Content = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>All: {props.all}</p>
      <p>Average {props.average}</p>
      <p>Positive {props.positive}%</p>
    </div>
  )
}

const App = () => {
  const title = "Give feedback"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const goodButtonHandler = (value) => {
    setGood(value += 1)
    setTotal(total + 1)
    setPositive((good + 1) / (total + 1) * 100)
    setAverage(average + 1)
  }
  
  const neutralButtonHandler = (value) => {
    setNeutral(value += 1)
    setTotal(total + 1)
    setPositive((good / (total + 1)) * 100)
  }
  
  const badButtonHandler = (value) => {
    setBad(value += 1)
    setTotal(total + 1)
    setPositive((good / (total + 1)) * 100)
    setAverage(average - 1)
  }


  return (
    <div className="App">
      <h1>{title}</h1>
      <button onClick={() => goodButtonHandler(good)}>Good</button>
      <button onClick={() => neutralButtonHandler(neutral)}>Neutral</button>
      <button onClick={() => badButtonHandler(bad)}>Bad</button>
      <Content
      good={good}
      neutral={neutral}
      bad={bad}
      all={total}
      average={average / total}
      positive={positive}
      />
    </div>
  );
}

export default App;
