import React, { useState } from 'react'

const Person = ({ name, number }) => {
    return (
        <p>{name} {number}</p>
    )
}

const ItemsToShow = ({ persons, filter }) => {
    let list = []
    if (filter === '') {
        list = persons.concat()
    } else {
        list = persons.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
    }
    return (
        <div>
            {list.map(person =>
                <Person key={person.id} name={person.name} number={person.number}/> )}  
        </div>
    )

}

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

    const addName = (event) => {
        event.preventDefault()
        let personsNames = persons.map((person) => person.name)
        if (personsNames.includes(newName)) {
            window.alert(`${newName} is already added to the phonebook`)
        }
        else {
            const nameObject = {
                id: persons.lenght + 1,
                name: newName,
                number: newPhoneNumber
            }
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

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            
                <input
                    value={newFilter}
                    onChange={handleFilter} />                
         
            <h2>Add new</h2>
            <form onSubmit={addName} >
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
            <h2>Numbers</h2>
            <ItemsToShow persons={persons} filter={newFilter} />
        </div>
    )
}




export default App