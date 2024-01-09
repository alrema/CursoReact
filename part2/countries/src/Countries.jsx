import CountryInfo from "./CountryInfo";

const Countries = ({ countries, onClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter </p>;
  }

  if (countries.length == 1) {
    return <CountryInfo country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => {
        return (
          <p key={country.name.official}>
            {country.name.common}{" "}
            <button onClick={onClick} value={country.name.official}>
              Show
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default Countries;
