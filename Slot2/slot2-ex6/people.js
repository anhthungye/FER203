var people = [
  {name: 'Jack', age: 50},
  {name: 'Michael', age: 9}, 
  {name: 'John', age: 40}, 
  {name: 'Ann', age: 19}, 
  {name: 'Elisabeth', age: 16}
];

const firstTeen = people.find(person => person.age >= 10 && person.age <= 20);
console.log('First teenager:', firstTeen);

const allTeens = people.filter(person => person.age >= 10 && person.age <= 20);
console.log('All teenagers:', allTeens);

const allAreTeens = people.every(person => person.age >= 10 && person.age <= 20);
console.log('All are teens?', allAreTeens);

const anyTeens = people.some(person => person.age >= 10 && person.age <= 20);
console.log('Any teens?', anyTeens);