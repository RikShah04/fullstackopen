import { useEffect, useState } from 'react'
import getWeather from '../services/weather'

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState(null)
    const [wind, setWind] = useState(0)

    let latlng = country.latlng
    useEffect(() => {
        getWeather(latlng[0], latlng[1])
            .then(request => {
                setWeather(request.main.temp)
                setIcon(request.weather[0].icon)
                setWind(request.wind.speed)
            })
    }, [latlng])

    return(
        <div>
            <h1> Weather in {country.capital}</h1>
            <div> Temperature: {weather} Celcius </div>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon"/>
            <div> Wind: {wind} m/s </div>
        </div>
    )
}

export default Weather