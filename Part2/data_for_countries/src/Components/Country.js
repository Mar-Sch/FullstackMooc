import React from 'react'
import WeatherForecast from './WeatherForecast';


const Country = ({ country }) => {

    let languages = country[0].languages    

    return (
        <div>
            <h1>{country[0].name}</h1>
            <p>Capital: {country[0].capital}</p>
            <p>Population: {country[0].population}</p>

            <h2>Languages</h2>
            <ul>
                {languages.map(language =>
                    <li key={language.name}>
                        {language.name}
                    </li>
                )}
            </ul>

            <img src={country[0].flag} alt="flag" width="200" height="150"/>

            <WeatherForecast capital={country[0].capital}/>
            
        </div>
    )
}

export default Country


