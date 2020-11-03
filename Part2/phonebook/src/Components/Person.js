import React from 'react'

const Person = ({ name, number, remove }) => {
    return (
        <p>{name} {number}
            &nbsp;
            <button
                onClick={remove}>
                {'Delete'}
            </button>
        </p>
    )
}

export default Person