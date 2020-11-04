import React from 'react'

const PersonForm = ({ addNew, newName, newPhoneNumber, handleNewNameChange, handleNewPhoneNumber }) => {

    return (
        <div>
            <h2>Add new</h2>

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
    )
}

export default PersonForm