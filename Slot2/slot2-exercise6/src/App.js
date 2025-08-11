import React from "react";

function App() {
  const people = [
    { name: "Jack", age: 50 },
    { name: "Michael", age: 9 },
    { name: "John", age: 40 },
    { name: "Ann", age: 19 },
    { name: "Elisabeth", age: 16 }
  ];

  const firstTeen = people.find(person => person.age >= 10 && person.age <= 20);

  const allTeens = people.filter(person => person.age >= 10 && person.age <= 20);

  const allAreTeens = people.every(person => person.age >= 10 && person.age <= 20);

  const anyTeens = people.some(person => person.age >= 10 && person.age <= 20);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Teenagers Check</h1>

      <h2>First teenager:</h2>
      <p>{firstTeen ? `${firstTeen.name} (${firstTeen.age})` : "None"}</p>

      <h2>All teenagers:</h2>
      <ul>
        {allTeens.map((teen, index) => (
          <li key={index}>{teen.name} ({teen.age})</li>
        ))}
      </ul>

      <h2>All are teens?</h2>
      <p>{allAreTeens ? "Yes" : "No"}</p>

      <h2>Any teens?</h2>
      <p>{anyTeens ? "Yes" : "No"}</p>
    </div>
  );
}

export default App;
