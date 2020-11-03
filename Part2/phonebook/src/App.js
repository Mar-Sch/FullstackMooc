import React, { useState, useEffect } from 'react'
import DisplayFilter from './Components/DisplayFilter';
import DisplayPhonebook from './Components/DisplayPhonebook';
import PersonForm from './Components/PersonForm';
import personService from './Services/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    const removeContact = (id) => {
        if (window.confirm("Do you really want to delete this contact?")) {
            personService
                .remove(id)
                .then(res => {
                    setPersons(persons.filter(person => person.id !== id))
                    console.log(res)
                })
        }
    }       

    useEffect(() => {
        personService
            .getAll()
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
            <DisplayPhonebook persons={persons} check={newFilter} removeContact={removeContact} />
        </div>
    )
}

export default App