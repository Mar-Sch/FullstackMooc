import React, { useState } from 'react'
import DisplayFilter from './Components/DisplayFilter';
import DisplayPhonebook from './Components/DisplayPhonebook';
import PersonForm from './Components/PersonForm';



const App = () => {
    const [persons, setPersons] = useState([
        {
            id: 1,
            name: 'Arto Hellas',
            number: '0500342152',
        },
        {
            id: 2,
            name: 'Marco Schaafsma',
            number: '0404343242152',
        },
        {
            id: 3,
            name: 'James Bond',
            number: '007',
        }
    ])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <DisplayFilter newFilter={newFilter} handleFilter={handleFilter} />
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                newName={newName}
                setNewName={setNewName}
                newPhoneNumber={newPhoneNumber}
                setNewPhoneNumber={setNewPhoneNumber}
            />    
            <DisplayPhonebook persons={persons} check={newFilter} />
        </div>
    )
}

export default App