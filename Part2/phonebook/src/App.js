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

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneNrChange = (event) => {
        setNewPhoneNumber(event.target.value)
    }

    const addNew = (event) => {
        event.preventDefault()
        let personsNames = persons.map((person) => person.name)
        if (personsNames.includes(newName)) {
            //if the contact is already in the phonebook, the user can update the contact phonenumber
            if (window.confirm("Contact is already in the phonebook. Do you want to replace?")) {
                const objectToUpdate = persons.find(object => object.name === newName)
                const updatedObject = {
                    id: objectToUpdate.id,
                    name: objectToUpdate.name,
                    number: newPhoneNumber
                }
                personService
                    .update(objectToUpdate.id, updatedObject)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== updatedObject.id ? person : response.data))
                        handleNotificationMessage([`${updatedObject.name} successfully updated`, 'notification'])
                        setNewName('')
                        setNewPhoneNumber('')
                    })
                    .catch(error => {
                        console.log('fail')
                        handleNotificationMessage([`${updatedObject.name} cannot be found`, 'error'])
                        setPersons(persons.filter(n => n.id !== updatedObject.id))
                    })
            }
        }
        else {
            const newObject = {
                id: persons.length + 1,
                name: newName,
                number: newPhoneNumber
            }
            console.log(newObject)
            personService
                .addNew(newObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    handleNotificationMessage([`${newObject.name} successfully added`, 'notification'])
                    setNewName('')
                    setNewPhoneNumber('')
                })
        }
    }

    const handleNotificationMessage = (message) => {
        const messageToShow = message[0]
        const withClassName = message[1]
        setNotificationMessage([messageToShow, withClassName])
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
                newName={newName}
                newPhoneNumber={newPhoneNumber}
                handleNewPhoneNumber={handlePhoneNrChange}
                handleNewNameChange={handleNameChange}
                addNew={addNew}
            />
            <DisplayPhonebook persons={persons} check={newFilter} removeContact={removeContact} />
        </div>
    )
}

export default App