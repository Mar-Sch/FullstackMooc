import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)


const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [voted, setVoted] = useState(new Array(6).fill(0))

    const handleSelected = () => { setSelected(Math.floor(Math.random() * 6)) }   

    const handleVoted = () =>
        setVoted({ ...voted, [selected]: voted[selected] + 1 })

    console.log(voted)

    return (
        <div>
            <AnecdoteOfTheDay selected={selected} voted={voted} anecdotes={anecdotes} />
            <p>
                <Button onClick={handleVoted} text='Vote' />
                <Button onClick={handleSelected} text='next anecdote' />                
            </p>
            <PopularVote voted={voted} anecdotes={anecdotes} />
        </div>
    )
}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const AnecdoteOfTheDay = (props) => {
    var selected = props.selected
    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {props.voted[selected]} votes</p>
        </div>
    )
}

const PopularVote = (props) => {
    let indexHighestVote = 0

    for (var i = 0 ; i < 5; i++) {
        if (props.voted[i] > props.voted[indexHighestVote])
            indexHighestVote = i
    }
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[indexHighestVote]}</p>
            <p>has {props.voted[indexHighestVote]} votes</p>
        </div>
    )
}


            ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)