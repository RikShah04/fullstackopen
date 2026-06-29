import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAllCountries = () => {
    const request = axios.get(baseUrl)
    return request.then(request => request.data)
}

export default getAllCountries