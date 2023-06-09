import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})

  const showRandomAnecdote = () => {
    var randomAnecdoteNumber = Math.floor(Math.random() * (anecdotes.length - 1) + 1)
    console.log(randomAnecdoteNumber)
    setSelected(randomAnecdoteNumber)
  }
  
  const voteForAnecdote = () => {
    const pointsCopy = {...points}
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }
  
  return (
   
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]} 
      </p>
      <p>has {points[selected]} votes</p>
      <button onClick = {voteForAnecdote}>vote</button>
      <button onClick = {showRandomAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      
      
      <p>
        {/* Gets the key of the points dictionary with the highest value */ }
        {anecdotes[Object.keys(points).find(key => points[key] === Math.max(...Object.values(points)))]}
      </p>
      <p>has {points[Object.keys(points).find(key => points[key] === Math.max(...Object.values(points)))]} votes</p>
      
    </div>
  )
}

export default App