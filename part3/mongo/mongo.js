const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://alrema91:${password}@clustergamelogtest.fyjh2j2.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  if (process.argv.length == 4) {
    console.log(
      "Please provide the name and the namber of the new person: node mongo.js <password> <name> <number>"
    );
    process.exit(1);
  }

  newName = process.argv[3];
  newNumber = process.argv[4];
  id = Math.floor(Math.random() * 100000) + 1;

  const person = new Person({
    name: newName,
    number: newNumber,
    id: id,
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
