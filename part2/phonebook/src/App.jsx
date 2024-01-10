import { useState, useEffect } from "react";
import Filter from "./Filter";
import Numbers from "./Numbers";
import PersonForm from "./PersonForm";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((storedPersons) => {
      setPersons(storedPersons);
    });
  }, []);

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
      personsService
        .create({ name: newName, number: newNumber })
        .then((person) => {
          setPersons(persons.concat(person));
        });
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
