import React from 'react'

const CountryList = ({ countries, handleShowButton }) => {

    const resetFilter = (props) => handleShowButton('Netherlands')
        
    return (
        <div>
            {countries.map((country) =>                
                <p key={country.callingCodes}>
                    {country.name}                    
                    &nbsp;     

 
                    <Button
                        handleClick={resetFilter}
                        text='show'
                    />
                    
                </p>)} 
        </div>
    )

}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}   

export default CountryList