import React from 'react'
import personService from '../Services/Persons'


const PersonForm = ({ persons, setPersons, newName, setNewName, newPhoneNumber, setNewPhoneNumber }) => {

    const addNew = (event) => {
        event.preventDefault()
        let personsNames = persons.map((person) => person.name)
        if (personsNames.includes(newName)) {
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
                    })
            }
        }       
        
        else {
            const nameObject = {
                id: persons.length + 1,
                name: newName,
                number: newPhoneNumber
            }
            personService
                .addNew(nameObject)
                .then(response => {
                    console.log(response)
                    setPersons(persons.concat(response.data))                    
                })            
        }
        setNewName('')
        setNewPhoneNumber('')
    }

    const handleNewPhoneNumber = (event) => {
        setNewPhoneNumber(event.target.value)
    }

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Add new</h2>
            <div>
                <form onSubmit={addNew} >
                    <div>
                        name: <input
                            value={newName}
                            onChange={handleNewNameChange}
                        />
                    </div>
                    <div>
                        number: <input
                            value={newPhoneNumber}
                            onChange={handleNewPhoneNumber}
                        />
                    </div>
                    <div>
                        <button type="submit">add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PersonForm