import React from 'react'




const CountryList = ({ countries, handleShowButton }) => {

    
    return (
        <div>
            {countries.map((country) =>
                <p key={country.callingCodes}>
                    {country.name}  
                    &nbsp;
                    <button onClick={() =>
                        console.log('clicked')}
                    >
                        Show
                    </button>
                    
                </p>)} 
        </div>
    )

}

export default CountryList
