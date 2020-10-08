import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const persons = [
    {
        id: 1,
        name: 'HTML is easy',
    },
    {
        id: 2,
        name: 'Browser can execute only Javascript',
    },
    {
        id: 3,
        name: 'GET and POST are the most important methods of HTTP protocol',
    }
]


ReactDOM.render(
    <App persons={persons} />,
    document.getElementById('root')
)