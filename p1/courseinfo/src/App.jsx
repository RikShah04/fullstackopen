const Header = (props) => {
  return (
    <div>
      This course is {props.course.name}
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map(part => <Part key={part.name} part={part} />)}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.part.name} {props.part.exercises}
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      Number of exercises {props.parts.reduce((sum, part) => sum + part.exercises, 0)}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App