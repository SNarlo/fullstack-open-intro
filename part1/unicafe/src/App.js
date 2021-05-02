import React, {useState} from 'react'

const Content = (props) => {
  if (props.stats) {
    return (
      <div>
        <Statistics 
        good={props.good}
        bad={props.bad}
        neutral={props.neutral}
        all={props.all}
        average={props.average}
        positive={props.positive}
        />
      </div>
    )
  }
  return (
    <div></div>
  )
}

const NoFeedback = (props) => {
  if (!props.stats) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div></div>
  )
}

const Statistic = (props) => {
  return (
    <>
      <p>{props.name}: {props.stat}</p>
    </>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <Statistic name={'Good'} stat={props.good}/>
      <Statistic name={'Neutral'} stat={props.neutral}/>
      <Statistic name={'bad'} stat={props.bad}/>
      <Statistic name={'All'} stat={props.total}/>
      <Statistic name={'Average'} stat={props.average}/>
      <Statistic name={'Positive'} stat={props.positive}/>
    </div>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.name}</button>
    </>
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
  const [stats, hasStats] = useState(false)

  const goodButtonHandler = (value) => {
    hasStats(true)
    setGood(value += 1)
    setTotal(total + 1)
    setPositive((good + 1) / (total + 1) * 100)
    setAverage(average + 1)
  }
  
  const neutralButtonHandler = (value) => {
    hasStats(true)
    setNeutral(value += 1)
    setTotal(total + 1)
    setPositive((good / (total + 1)) * 100)
  }
  
  const badButtonHandler = (value) => {
    hasStats(true)
    setBad(value += 1)
    setTotal(total + 1)
    setPositive((good / (total + 1)) * 100)
    setAverage(average - 1)
  }


  return (
    <div className="App">
      <h1>{title}</h1>
      {/* <button onClick={() => goodButtonHandler(good)}>Good</button> */}
      <Button onClick={() => goodButtonHandler(good)} name={"Good"}/>
      <Button onClick={() => neutralButtonHandler(neutral)} name={"Neutral"}/>
      <Button onClick={() => badButtonHandler(bad)} name={"Bad"}/>
      <NoFeedback stats={stats}/>
      <Content 
      stats={stats}
      good={good}
      bad={bad}
      neutral={neutral}
      all={total}
      average={average / total}
      positive={positive}
      />
    </div>
  );
}

export default App;
