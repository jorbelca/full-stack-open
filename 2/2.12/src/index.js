import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"

const Countries = ({ countries }) => {
  return (
    <>
      <ul>
        {countries.length >= 10
          ? "Too many matches, specify another filter"
          : countries.length === 1
          ? countries.map((country) => (
              <div key={country.name.common}>
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
              </div>
            ))
          : countries.map((country) => (
              <li key={country.name.common}>
                <span>{country.name.common},</span>

                <span>&nbsp;</span>
                <span>{country.capital}</span>
              </li>
            ))}
      </ul>
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

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Filter
        search={search}
        countries={countries}
        newSearch={newSearch}
        setCountries={setCountries}
      />

      <Countries countries={countries} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
