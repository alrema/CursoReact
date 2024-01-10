const Person = ({ person, onClick }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={onClick} value={person.id}>
        Delete
      </button>
    </p>
  );
};

export default Person;
