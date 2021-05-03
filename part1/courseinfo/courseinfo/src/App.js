import React from 'react'

const Course = (props) => {
  return (
    <div> 

    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = ({name, exercise}) => {
  return (
    <>
      <p>{name} {exercise}</p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
     {parts.map(part => <Part name={part.name} exercise={part.exercises}/>)} 
    </>
  )
}

const Total = ({parts}) => {
  return (
    <>
      <p><b>Number of exercises {Object.values(parts).reduce((sum, {exercises}) => sum + exercises, 0)}</b></p>
    </>
  )  
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App;
