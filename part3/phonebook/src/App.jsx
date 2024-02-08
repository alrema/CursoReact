import { useState, useEffect } from 'react'
import Filter from './Filter'
import Numbers from './Numbers'
import PersonForm from './PersonForm'
import personsService from './services/persons'
import styles from './styles'
import TemporalText from './TemporalText'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilter] = useState('')
  const [successText, setSuccess] = useState('')
  const [errorText, setError] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then((storedPersons) => {
        setPersons(storedPersons)
      })
      .catch((error) => {
        window.alert(`error trying to fetch persons: ${error}`)
      })
  }, [errorText])

  const changeNewName = (event) => {
    setNewName(event.target.value)
  }

  const changeNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filter = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find((person) => {
      return person.name === newName
    })
    if (person) {
      if (
        window.confirm(
          `${person.name} already exists. Do you want to replace the number with the new one?`
        )
      ) {
        personsService
          .update({ ...person, number: newNumber })
          .then(() => {
            setSuccess(`Person ${person.name} was updated successfully`)
            setPersons((prevState) =>
              prevState.map((prevPerson) =>
                prevPerson.name === person.name
                  ? { ...prevPerson, number: newNumber }
                  : prevPerson
              )
            )
          })
          .catch((error) => {
            setError(
              `Error trying to update the person: ${error.response.data.error}`
            )
          })
      }
    } else {
      personsService
        .create({ name: newName, number: newNumber })
        .then((person) => {
          setSuccess(`Person ${person.name} was created successfully`)

          setPersons(persons.concat(person))
        })
        .catch((error) => {
          setError(
            `Error trying to add the person: ${error.response.data.error}`
          )
        })
    }
  }

  const deletePerson = (event) => {
    const id = Number(event.target.value)
    const person = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(() => {
          setSuccess(`Person ${person.name} was deleted successfully`)
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          setError(
            `Error trying to remove the person: ${error.response.data.error}`
          )
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <TemporalText
        style={styles.success}
        text={successText}
        updateText={setSuccess}
      />
      <TemporalText
        style={styles.error}
        text={errorText}
        updateText={setError}
      />
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
  )
}

export default App
