import { useEffect, useState } from 'react'
import Countries from './components/Countries'
import getAllCountries from './services/countries'


const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])


  useEffect(() => {
    getAllCountries()
      .then(countries =>
        setCountries(countries)
      )
  }, [])

  const nameChange = (event) => {
    console.log(event.target.value)
    let newFilter = event.target.value
    setFilter(newFilter)
    if(newFilter == ""){
      setFilteredCountries([])
    }else{
      let newFiltered = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      setFilteredCountries(newFiltered)
    }
  }


  return(
    <div>
      <form>
        <div> find countries <input onChange={nameChange}/></div>
      </form>
      <div>
        <Countries filteredCountries={filteredCountries} setShown={setFilteredCountries} filter={filter}/>
      </div>
    </div>
  )
}

export default App
