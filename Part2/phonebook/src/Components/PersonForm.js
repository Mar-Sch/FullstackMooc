import React from 'react'

const PersonForm = ({ persons, setPersons, newName, setNewName, newPhoneNumber, setNewPhoneNumber }) => {

    const addNew = (event) => {
        event.preventDefault()
        let personsNames = persons.map((person) => person.name)
        if (personsNames.includes(newName)) {
            window.alert(`${newName} is already added to the phonebook`)
        }
        else {
            const nameObject = {
                id: persons.length + 1,
                name: newName,
                number: newPhoneNumber
            }
            console.log('Hallo', nameObject.id)
            setPersons(persons.concat(nameObject))
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