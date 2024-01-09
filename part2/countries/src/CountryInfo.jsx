import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const CountryInfo = ({ country }) => {
  const api_key = import.meta.env.VITE_API_KEY;
  const basepath = import.meta.env.VITE_API_BASEPATH;
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(`${basepath}/current.json?key=${api_key}&q=${country.capital}`)
      .then((response) => setWeather(response.data.current));
  }, [api_key, basepath, country.capital]);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map((language) => {
          return <li key={language[0]}>{language[1]}</li>;
        })}
      </ul>
      <img src={country.flags.png} />
      {weather.condition && (
        <>
          <h3> Current weather in {country.capital}</h3>
          <p>{weather.condition.text}</p>
          <img src={weather.condition.icon} />
          <p>
            <b>temperature: </b> {weather.temp_c} ºC
          </p>
          <p>
            <b>wind: </b> {weather.wind_kph} km/h
          </p>
        </>
      )}
    </div>
  );
};

export default CountryInfo;
