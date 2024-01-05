import Person from "./Person";
const Numbers = ({ persons, filterText }) => {
  const filteredPersons = persons.filter((person) => {
    return person.name.includes(filterText);
  });

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => {
          return (
            <li key={person.id}>
              {" "}
              <Person person={person} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Numbers;
