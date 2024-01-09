const CountryInfo = ({ country }) => {
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
    </div>
  );
};

export default CountryInfo;
