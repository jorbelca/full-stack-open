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
            <li>{language[1]}</li>
          ))}
        </p>
        <div className="flag">
          <img
            src={country.flags.svg}
            alt="flag"
            srcset=""
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
const AbreviatedCountry = ({ country, setCountries }) => {
  const show = () => {
    setCountries([country])
  }

  return (
    <>
      <li key={country.name.common}>
        <span>{country.name.common}</span>
        <span>&nbsp;</span>
        <button onClick={show}>Show</button>
      </li>
    </>
  )
}

const Filter = ({ search, countries, newSearch, setCountries }) => {
  const filter = (search) => {
    const result = countries.filter((country) => {
      if (
        country.name.common.toLocaleLowerCase().includes(search.toLowerCase())
      ) {
        return country
      }
    })

    setCountries(result)
  }

  const handleFilter = (e) => {
    newSearch(e.target.value)
    filter(e.target.value)
  }
  return (
    <div>
      Filter shown with<span>&nbsp;</span>
      <span>
        <input value={search} onChange={handleFilter} />
      </span>
    </div>
  )
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
      <Filter
        search={search}
        countries={countries}
        newSearch={newSearch}
        setCountries={setCountries}
      />

      <ul>
        {countries.length >= 10
          ? "Too many matches, specify another filter"
          : countries.length === 1
          ? countries.map((country) => (
              <CompleteCountry
                key={country.population}
                country={country}
                weather={weather}
                setCity={setCity}
              />
            ))
          : countries.map((country) => (
              <AbreviatedCountry
                key={country.population}
                country={country}
                setCountries={setCountries}
              />
            ))}
      </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
