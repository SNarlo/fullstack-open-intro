import React, {useEffect} from 'react'
import useState from 'react-usestateref'
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

const Weather = (props) => {
  return (
    <div>
      <h2>Weather in {props.city}</h2>

      <p><b>Temperature: </b>{props.temp}</p>
      <img src={props.icon} alt='weather'></img>
      <p><b>Wind: </b>{props.windSpeed}mph, direction: {props.direction}</p>
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

      {props.weather}
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

  const setWeatherForCapital = async(capital) => {
    const params = {
      access_key : '0cbacbaf8ace377452f0ddd9fc785b14',
      query : capital
    }
    const response = await axios.get('http://api.weatherstack.com/current', {params})
    
    return response
  }

  const expandCountry = (event) => {
    let selectedCountry = countries.filter(country => country.name === event.target.id) 

    setWeatherForCapital(selectedCountry[0].capital).then(response => {
      let temperature = response.data.current.temperature
      let windSpeed = response.data.current.wind_speed
      let direction = response.data.current.wind_dir
      let weatherIcon = response.data.current.weather_icons[0]

      setDisplayedComponent(<SingleCountry 
        country={selectedCountry[0].name} 
        capital={selectedCountry[0].capital} 
        population={selectedCountry[0].population} 
        language={selectedCountry[0].languages}
        flag={selectedCountry[0].flag} 
        weather={<Weather city={selectedCountry[0].capital} temp={temperature} windSpeed={windSpeed} direction={direction} icon={weatherIcon}/>}/>)
    })
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
      setWeatherForCapital(tempArray[0].capital).then(response => {
        let temperature = response.data.current.temperature
        let windSpeed = response.data.current.wind_speed
        let direction = response.data.current.wind_dir
        let weatherIcon = response.data.current.weather_icons[0]
  
        setDisplayedComponent(<SingleCountry 
          country={tempArray[0].name} 
          capital={tempArray[0].capital} 
          population={tempArray[0].population} 
          language={tempArray[0].languages}
          flag={tempArray[0].flag} 
          weather={<Weather city={tempArray[0].capital} temp={temperature} windSpeed={windSpeed} direction={direction} icon={weatherIcon}/>}/>)
      })
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
