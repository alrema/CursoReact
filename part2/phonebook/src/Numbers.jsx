import Person from "./Person";
const Numbers = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
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
