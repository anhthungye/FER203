import React from "react";
import { Table } from "react-bootstrap";

const PeopleList = () => {
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
    <div className="container mt-4">
      <h1 className="mb-4">Teenagers Check</h1>

      <h4>All People:</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>First teenager:</h4>
      <p>{firstTeen ? `${firstTeen.name} (${firstTeen.age})` : "None"}</p>

      <h4>All teenagers:</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {allTeens.map((teen, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{teen.name}</td>
              <td>{teen.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h4>All are teens?</h4>
      <p className={allAreTeens ? "text-success" : "text-danger"}>
        {allAreTeens ? "Yes" : "No"}
      </p>

      <h4>Any teens?</h4>
      <p className={anyTeens ? "text-success" : "text-danger"}>
        {anyTeens ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default PeopleList;
