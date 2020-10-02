import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => {
    return (
        <tr><td>{text}</td><td>{value}</td></tr>
    )
}

const Statistics = (props) => {

    //calculating the average score; good: 1, neutral: 0, bad: -1
    let average = (props.good * 1 + props.bad * -1) / props.allFeedback

    //percentage of positive feedback:
    let positive = (100 * props.good) / props.allFeedback + "%"

    if (props.allFeedback === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    return (
        <table>     
            <tbody>
                <Statistic text="Good" value={props.good} />
                <Statistic text="Neutral" value={props.neutral} />
                <Statistic text="Bad" value={props.bad} />
                <Statistic text="All" value={props.allFeedback} />
                <Statistic text="Average" value={average} />
                <Statistic text="Positive" value={positive} />
            </tbody>
        </table>
        )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {setGood(good+1)}
    const handleNeutral = () => {setNeutral(neutral + 1)}
    const handleBad = () => { setBad(bad + 1) }

    let allFeedback = good + neutral + bad


    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGood} text='Good' />
            <Button onClick={handleNeutral} text='Neutral' />
            <Button onClick={handleBad} text='Bad' />           

            <h1>Statistics</h1>
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                allFeedback={allFeedback}
            />
        </div>
    )
    
}

ReactDOM.render(<App />,
    document.getElementById('root')
)