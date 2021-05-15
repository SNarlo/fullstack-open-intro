import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Input = (props) => {
  return (
    <div>
      {props.text}<input onChange={props.changed}/>
    </div>
  )
}

const Output = (props) => {
  return (
    <div>
      {props.countries.map(country => 
        <p key={country.name}>{country.name} <button id={country.name} onClick={props.click}>Show More</button></p>
      )} 
    </div>
  )
}

const SingleCountry = (props) => {
  return (
    <div>
      <h1>{props.country}</h1>
      <p>Capital: {props.capital}</p>
      <p>Population: {props.population}</p>

      <h2>Languages</h2>
      {props.language.map(language => 
      <li key={language.name}>{language.name}</li>)}
  
      <img src={props.flag} alt="country flag" height="100px" width="120px"></img>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFiltered] = useState([])
  const [displayedComponent, setDisplayedComponent] = useState()

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const expandCountry = (event) => {

    let selectedCountry = countries.filter(country => country.name === event.target.id)  
    setDisplayedComponent(<SingleCountry 
      country={selectedCountry[0].name} 
      capital={selectedCountry[0].capital} 
      population={selectedCountry[0].population} 
      language={selectedCountry[0].languages}
      flag={selectedCountry[0].flag} />)
  }


  const filterCountries = (event) => {
    let tempArray = (countries.filter(country => country.name.toLowerCase().includes(event.target.value)))
    
    if (tempArray.length < 10) {
      setFiltered(tempArray)
      setDisplayedComponent(<Output click={expandCountry} countries={filteredCountries}/>)
    } 
    
    if (tempArray.length >= 10) {
      setDisplayedComponent(['Too many matches, specify search more'])
    }

    if (tempArray.length === 1) {
      setDisplayedComponent(
      <SingleCountry 
        country={tempArray[0].name} 
        capital={tempArray[0].capital} 
        population={tempArray[0].population} 
        language={tempArray[0].languages}
        flag={tempArray[0].flag}
      />)
    }
  }

  return (
   <div>
     <Input text={'Find countries: '} changed={filterCountries}/>
     <div>
       {displayedComponent}
     </div>
   </div> 
  )
}

export default App;
