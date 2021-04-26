import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.partName} {props.partExerciseCount}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part partName1={props.part1} partExerciseCount1={props.exercises1}/>
      <Part partName2={props.part2} partExerciseCount2={props.exercises2}/>
      <Part partName3={props.part3} partExerciseCount3={props.exercises3}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
  )  
}

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
    <div>
      < Header course={course}/>
      <Content 
      partName1={part1} partName2={part2} partName3={part3} 
      partExerciseCount1={exercises1} partExerciseCount2={exercises2} partExerciseCount3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App;
