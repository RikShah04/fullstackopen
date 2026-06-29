import Weather from './Weather.jsx'

const Country = ({country}) => {
  if (country === null){
    return null
  }
  return(
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h1>Languages</h1>
        <ul>
          {Object.values(country.languages).map(language =><li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}/>
        <Weather country={country}/>
      </div>
    )
}

export default Country