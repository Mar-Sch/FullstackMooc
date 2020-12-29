import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {voteOf} from '../reducers/anecdoteReducer'


const Anecdotes = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteOf(id))
    }

    return (
        <div>
            {anecdotes
            .sort((a, b) => (a.votes > b.votes) ? -1 : 1)
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes

