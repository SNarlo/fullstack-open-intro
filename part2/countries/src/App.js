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
        <p key={country.name}>{country.name}</p>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFiltered] = useState([])
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const filterCountries = (event) => {
    let tempArray = (countries.filter(country => country.name.toLowerCase().includes(event.target.value)))
    
    if (tempArray.length < 10) {
      setFiltered(tempArray)
    } 
    
    if (tempArray.length >= 10) {
      let tooManySearches = [{name: 'Too many matches, specify search more'}]
      setFiltered(tooManySearches)
    }
  }

  return (
   <div>
     <Input text={'Find countries: '} changed={filterCountries}/>
     <Output countries={filteredCountries}/>
   </div> 
  )
}

export default App;
