import React from 'react'

const DisplayFilter = ({ newFilter, handleFilter }) => { 
    return (
        <div>
        <input
            value={newFilter}
                onChange={handleFilter} />
        </div>
    )
}

export default DisplayFilter