import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountry from './Components/DisplayCountry';
import DisplayFilter from './Components/DisplayFilter';


const App = () => {

    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState('')

    const handleFilter = (event) => {
        event.preventDefault()
        setNewFilter(event.target.value)
    }

    const handleFilterShowButton = (input) => {
        setNewFilter(input)
    }


    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    console.log('render', countries.length, 'countries')


    return (
        <div>
            <h3>Find countries</h3>
            <DisplayFilter newFilter={newFilter} handleFilter={handleFilter} />
            <DisplayCountry countries={countries} filter={newFilter} handleShowButton={handleFilterShowButton} />
        </div>
    )
}
export default App