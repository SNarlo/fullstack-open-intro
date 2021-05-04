import React from 'react'

const Course = (props) => {
  return (
    <div> 
      {props.Header}
      {props.Content}
      {props.Total}
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

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercise}</p>
    </div>
    
  )
}

const Content = ({parts}) => {
  return (
    <>
     {parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises} />)} 
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

  const courses = [
    {
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return (
    <div>
      {courses.map(course => <Course key={course.id}
      Header={<Header course={course.name}/>}
      Content={<Content parts={course.parts}/>}
      Total={<Total parts={course.parts}/>}
      />) }

    </div>
  )
}

export default App;
