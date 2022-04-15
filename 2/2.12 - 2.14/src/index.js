import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

const KEY = process.env.REACT_APP_API_KEY

const CompleteCountry = ({ country, weather, setCity }) => {
  setCity(country.capital)

  const icon = weather.weather[0].icon
  const url = `http://openweathermap.org/img/wn/${icon}@2x.png`

  const Wind = ({ weather }) => {
    const wind = weather.wind
    const degrees = (wind.deg * 8) / 360
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

    return (
      <>
        Wind: <span>&nbsp;</span>
        {wind.speed} Km/h
        <span>&nbsp;</span>
        {directions[degrees]}
      </>
    )
  }
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>

        <p>Capital: {country.capital}</p>
        <p>Population: {country.population.toLocaleString("es-ES")}</p>

        <h3>Languages</h3>
        <p>
          {Object.entries(country.languages).map((language) => (
            <li key={language[1]}>{language[1]}</li>
          ))}
        </p>
        <div className="flag">
          <img
            src={country.flags.svg}
            alt="flag"
            srcSet=""
            width="150px"
            height="100px"
          />
        </div>
        <div className="weather">
          <h3>Weather in {country.capital}</h3>
          <p>
            Temperature:<span>&nbsp;</span>
            {weather.main.temp} <span>&nbsp;</span>Cº
          </p>
          <p>
            <Wind weather={weather} />
          </p>
          <div id="icon">
            <img src={url} alt="Weather icon" />
          </div>
        </div>
      </div>
    </>
  )
}
const AbreviatedCountry = ({ country, newSearch }) => {
  return (
    <>
      <li key={country.name.common}>
        <span>{country.name.common}</span>
        <span>&nbsp;</span>
        <button onClick={() => newSearch(country.name.common)}>Show</button>
      </li>
    </>
  )
}

const Filter = ({ newSearch }) => {
  return (
    <div>
      Filter shown with<span>&nbsp;</span>
      <span>
        <input
          id="filterPerson"
          type="text"
          placeholder="name"
          onChange={(e) => {
            newSearch(e.target.value)
          }}
        />
      </span>
    </div>
  )
}
const Results = ({ search, countries, weather, setCity, newSearch }) => {
  const current_filter = search.toLowerCase()
  const matchedCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(current_filter)
  )
  if (!search) {
    return null
  }
  if (matchedCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (1 < matchedCountries.length && matchedCountries.length <= 10) {
    return (
      <div>
        {matchedCountries.map((country) => (
          <AbreviatedCountry
            key={country.population}
            country={country}
            newSearch={newSearch}
          />
        ))}
      </div>
    )
  } else if (matchedCountries.length === 1) {
    return (
      <div>
        {matchedCountries.map((country) => (
          <CompleteCountry
            key={country.population}
            country={country}
            weather={weather}
            setCity={setCity}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <p>No matches found, specify another filter</p>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, newSearch] = useState("")
  const [weather, setWeather] = useState("")
  const [city, setCity] = useState("Madrid")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [city])

  return (
    <div>
      <Filter newSearch={newSearch} />

      <ul>
        <Results
          countries={countries}
          search={search}
          weather={weather}
          setCity={setCity}
          newSearch={newSearch}
        />
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
