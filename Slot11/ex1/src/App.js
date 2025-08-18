import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('Adam');
  const [age, setAge] = useState(35);
  return (
    <>
      <section>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>My name is {name}</p>
      </section>
      <section>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <p>My age is {age}</p>
      </section>
    </>
  );
}

export default App;
