import React from 'react'

const CountryList = ({ countries, handleShowButton }) => {

    return (
        <div>            
            {countries.map((country) =>
                <CountryListItem
                    key={country.callingCodes}
                    country={country}
                    handleShowButton={() => handleShowButton(country.name)}
                />)}
        </div>
    )
}

const CountryListItem = ({ country, handleShowButton }) => {
    const countryName = country.name

    return (
        <p>{countryName}
            &nbsp;
            <button
                onClick={handleShowButton}>
                {'show'}
            </button>
        </p>
    )
}


export default CountryList