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
    personsService
      .getAll()
      .then((storedPersons) => {
        setPersons(storedPersons);
      })
      .catch((error) => {
        window.alert(`error trying to fetch persons: ${error}`);
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
        })
        .catch((error) => {
          window.alert(`error trying to add the person: ${error}`);
        });
    }
  };

  const deletePerson = (event) => {
    const id = event.target.value;
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          window.alert(`error trying to remove the person: ${error}`);
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
      <Numbers
        persons={persons}
        filterText={filterText}
        onClick={deletePerson}
      />
    </div>
  );
};

export default App;
