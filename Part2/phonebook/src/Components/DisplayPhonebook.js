import React from 'react'
import Person from './Person';

const DisplayPhonebook = ({ persons, check, removeContact}) => {
    let list = []
    if (check === '') {
        list = persons.concat()
    } else {
        list = persons.filter(item => item.name.toLowerCase().includes(check.toLowerCase()))
    }
    return (
        <div>
            <h2>Numbers</h2>
            {list.map(person =>
                <Person
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    remove={() => removeContact(person.id)}
                />)}

        </div>
    )
}

export default DisplayPhonebook