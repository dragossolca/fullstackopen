const Course = (props) => {
    return (
      <>
        <Header name={props.course.name}/>
        <Content parts={props.course.parts}/>
        
      </>
      
    )
  }
  
  const Header = (props) => {
      
    return (
      <>
        <h2>{props.name}</h2>
      </>
    )
  }
  
  const Content = (props) => {
    const parts = props.parts
    const initalValue = 0
    const total = parts.reduce((sum, part) =>{
      return sum + part.exercises
    }
     ,initalValue
    )
    return (
      <>
        {parts.map(part =>
            <p key={part.id}>
              <Part name = {part.name} exercises = {part.exercises}/>
            </p>
          )
        }
  
        <p><b>total of {total} exercises</b></p>
      </>
    )
  }
  
  const Part = (props) => {
      return (
        <>
          {props.name} {props.exercises}
        </>
      )
  }

  export default Course