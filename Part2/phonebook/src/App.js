import React, { useState, useEffect } from 'react'
import DisplayFilter from './Components/DisplayFilter';
import DisplayPhonebook from './Components/DisplayPhonebook';
import PersonForm from './Components/PersonForm';
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

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