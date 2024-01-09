import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import Countries from "./Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setCountriesFiltered(response.data);
    });
  }, []);

  const filter = (event) => {
    setCountriesFiltered(
      countries.filter((country) => {
        return (
          country.name.common
            .toUpperCase()
            .includes(event.target.value.toUpperCase()) ||
          country.name.official
            .toUpperCase()
            .includes(event.target.value.toUpperCase())
        );
      })
    );
  };

  const selectCountry = (event) => {
    setCountriesFiltered(
      countriesFiltered.filter((country) => {
        return country.name.official == event.target.value;
      })
    );
  };

  return (
    <>
      <div>
        <h1> Countrypedia </h1>
        <Filter onChange={filter} />
        {countriesFiltered.length > 0 && (
          <Countries countries={countriesFiltered} onClick={selectCountry} />
        )}
      </div>
    </>
  );
}

export default App;
