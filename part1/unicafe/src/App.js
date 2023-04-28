import { useState } from 'react'

const Statistics = (props) => {
  if(props.total === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text = "good" value = {props.good}/>
        <StatisticLine text = "neutral" value = {props.neutral}/>
        <StatisticLine text = "bad" value = {props.bad}/>
        <StatisticLine text = "all" value = {props.total}/>
        <StatisticLine text = "average" value = {(props.good - props.bad) / props.total}/>
        <StatisticLine text = "positive" value = {props.good/props.total * 100 +"%"} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>
          {props.text} {props.value}
        </td>
      </tr>
    </>
  )
} 

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.feedback} {props.feedback_value}</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick = {handleGoodClick} feedback = "good"/>
        <Button handleClick = {handleNeutralClick} feedback = "neutral"/>
        <Button handleClick = {handleBadClick} feedback = "bad"/>
      </div>

      <h1>statistics</h1>
     
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>

    </div>
  )
}

export default App