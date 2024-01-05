import React, { useState } from "react";
import Filter from "./Filter";
import Numbers from "./Numbers";
import PersonForm from "./PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: "Arto Hellas", number: "040-123456" },
    { id: 1, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 2, name: "Dan Abramov", number: "12-43-234345" },
    { id: 3, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilter] = useState("");

  const changeNewName = (event) => {
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const filter = (event) => {
    setFilter(event.target.value);
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
      <Filter onChange={filter} />
      <h2>Add new contact</h2>
      <PersonForm
        onChangeName={changeNewName}
        onChangeNumber={changeNewNumber}
        onSubmit={addPerson}
      />
      <Numbers persons={persons} filterText={filterText} />
    </div>
  );
};

export default App;
