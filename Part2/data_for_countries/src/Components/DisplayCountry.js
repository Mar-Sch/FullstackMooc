import React from 'react'
import Country from './Country';
import CountryList from './CountryList';

const DisplayCountry = ({ countries, filter }) => {
    let countryList = []
    countryList = countries.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))

    
    if (countryList.length === 1) {
        return (
            <div>
                <Country country={countryList} />
            </div>
        )
    } else if (countryList.length <= 10) {
        return (
            <div>
                <CountryList countries={countryList} />
            </div>
        )
    } else if (countryList.length < countries.length) {
        return (
            <div>
                <p>Too many matches, specify a more detailed filter</p>
            </div>
        )

    } else {
        return (
            <div></div>
        )
    }
 }

export default DisplayCountry

