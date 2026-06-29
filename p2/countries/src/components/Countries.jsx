import Country from './Country'

const Countries = ({filteredCountries, setShown, filter}) => {
  if (filteredCountries.length > 10){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }else if (filteredCountries.length > 1){
    return(
      <div>
        {filteredCountries.map(country => {
          return (
          <div key={country.cca2}>
            {country.name.common}
            <button onClick={() => setShown([country])}> Show </button>
          </div>
        )})}
        
      </div>
    )
  } else if (filteredCountries.length === 1){
    return(
      <div>
        <Country country={filteredCountries[0]}/>
      </div>
    )
  } else {
    if(filter.length > 0){
      return(
        <div>
          No Countries matching filter
        </div>
      )
    }
    else{
      return null
    }
  }
}

export default Countries