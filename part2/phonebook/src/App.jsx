import React, { useState } from "react";
import Numbers from "./Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: "Arto Hellas", number: "040-123456" },
    { id: 1, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 2, name: "Dan Abramov", number: "12-43-234345" },
    { id: 3, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFiltered] = useState(persons);

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const filter = (event) => {
    setFiltered(
      persons.filter((person) => {
        return person.name.includes(event.target.value);
      })
    );
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
      <h1>Phonebook</h1>
      <div>
        Filter name with <input onChange={filter} />
      </div>
      <h2>Add new contact</h2>
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
      <Numbers persons={filteredPersons} />
    </div>
  );
};

export default App;
