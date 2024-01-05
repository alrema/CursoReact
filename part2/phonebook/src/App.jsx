import React, { useState } from "react";
import Numbers from "./Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: "Arto Hellas", number: "666" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const exists = persons.find((person) => {
      return person.name == newName;
    });
    if (exists) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(
        persons.concat({ id: persons.length, name: newName, number: newNumber })
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={changeNewName} />
        </div>
        <div>
          number: <input onChange={changeNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
