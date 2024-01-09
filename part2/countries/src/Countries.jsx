import CountryInfo from "./CountryInfo";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter </p>;
  }

  if (countries.length == 1) {
    return <CountryInfo country={countries[0]} />;
  }

  return (
    <div>
      <ul>
        {countries.map((country) => {
          return <li key={country.name.official}>{country.name.common}</li>;
        })}
      </ul>
    </div>
  );
};

export default Countries;
