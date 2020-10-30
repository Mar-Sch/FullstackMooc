import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherForecast = ({ capital }) => {

    const [forecast, setForecast] = useState([])
    let api_key = process.env.REACT_APP_API_KEY
    //let api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: 'ADD ACCESS KEY',
                    query: { capital }
                }
            })
            .then(response => {
                console.log('Forecast promise fulfilled')
                console.log(response)
                console.log('apikey', { api_key })
                setForecast(response.data)
            })
    }, [])


    if (forecast.length === 0) {
        return (
            <div>Loading</div>
        )
    } else {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p> <b>Temperature:</b> {forecast.current.temperature} Degree Celcius</p>
                <img src={forecast.current.weather_icons} alt="weather icon" width="50" height="50" />
                <p> <b>Wind:</b> {forecast.current.wind_speed}mph direction {forecast.current.wind_dir}</p>


            </div>
        )
    }


}

export default WeatherForecast