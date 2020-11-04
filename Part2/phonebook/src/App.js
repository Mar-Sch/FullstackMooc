import React, { useState, useEffect } from 'react'
import DisplayFilter from './Components/DisplayFilter';
import DisplayPhonebook from './Components/DisplayPhonebook';
import PersonForm from './Components/PersonForm';
import Notification from './Components/Notification';
import personService from './Services/Persons'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notificationMessage, setNotificationMessage] = useState([])


    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    const handleNotificationMessage = (message) => {
        const messageToShow = message[0]
        const withClassName = message[1]
        setNotificationMessage([messageToShow, withClassName])
        console.log('do we get the right message', notificationMessage)
        setTimeout(() => { setNotificationMessage([]) }, 5000)
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
            <Notification message={notificationMessage[0]} className={notificationMessage[1]} />
            <DisplayFilter newFilter={newFilter} handleFilter={handleFilter} />
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                newName={newName}
                setNewName={setNewName}
                newPhoneNumber={newPhoneNumber}
                setNewPhoneNumber={setNewPhoneNumber}
                notificationMessage={notificationMessage}
                handleNotificationMessage={handleNotificationMessage}
            />
            <DisplayPhonebook persons={persons} check={newFilter} removeContact={removeContact} />
        </div>
    )
}

export default App