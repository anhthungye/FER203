import { useState } from 'react';
import PersonList from './components/PersonList';
import AgeSkillFilter from './components/AgeSkillFilter';
import StatisticsBox from './components/StatisticsBox';
import SkillRanking from './components/SkillRanking';
import FilteredResult from './components/FilteredResult';

const persons = [
  { id: 1, firstName: 'Linh', lastName: 'Nguyen', age: 28, city: 'Ha Noi',  skills: ['React', 'Node'],   isActive: true },
  { id: 2, firstName: 'Minh', lastName: 'Tran',  age: 22, city: 'Da Nang', skills: ['Vue', 'CSS'],      isActive: false },
  { id: 3, firstName: 'Anh',  lastName: 'Le',    age: 35, city: 'HCM',     skills: ['React', 'Go'],     isActive: true },
  { id: 4, firstName: 'Ha',   lastName: 'Pham',  age: 29, city: 'Ha Noi',  skills: ['Angular', 'RxJS'], isActive: true },
  { id: 5, firstName: 'Tuan', lastName: 'Do',    age: 41, city: 'HCM',     skills: ['Node', 'SQL'],     isActive: false },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  const allSkills = persons.reduce((acc, person) => {
    person.skills.forEach(skill => {
      if (!acc.includes(skill)) acc.push(skill);
    });
    return acc;
  }, []);

  const filteredByAgeSkill = persons.filter(person => {
    const ageValid = (!minAge || person.age >= parseInt(minAge)) && (!maxAge || person.age <= parseInt(maxAge));
    const skillValid = !selectedSkill || person.skills.includes(selectedSkill);
    return ageValid && skillValid;
  });

  const filteredByName = persons.filter(({ firstName, lastName }) => {
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const sortedPersons = [...filteredByName].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.firstName.localeCompare(b.firstName);
    } else {
      return b.firstName.localeCompare(a.firstName);
    }
  });

  const stats = filteredByAgeSkill.reduce((acc, person) => ({
    totalPeople: acc.totalPeople + 1,
    totalAge: acc.totalAge + person.age,
    activeCount: acc.activeCount + (person.isActive ? 1 : 0)
  }), { totalPeople: 0, totalAge: 0, activeCount: 0 });

  const averageAge = stats.totalPeople > 0 ? (stats.totalAge / stats.totalPeople).toFixed(1) : 0;

  return (
    <div className="bg-gradient bg-light min-vh-100 py-5">
      <div className="container">
        <h1 className="mb-5 text-center text-primary display-4 fw-bold">
          <i className="bi bi-person-bounding-box me-2"></i>
          Person Management System
        </h1>
        <PersonList
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          sortOrder={sortOrder}
          onToggleSort={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          persons={sortedPersons}
        />
        <div className="row mb-4">
          <div className="col-md-8">
            <AgeSkillFilter
              minAge={minAge}
              maxAge={maxAge}
              selectedSkill={selectedSkill}
              onMinAgeChange={setMinAge}
              onMaxAgeChange={setMaxAge}
              onSkillChange={setSelectedSkill}
              allSkills={allSkills}
            />
          </div>
          <div className="col-md-4">
            <StatisticsBox
              totalPeople={stats.totalPeople}
              averageAge={averageAge}
              activeCount={stats.activeCount}
            />
          </div>
        </div>
        <FilteredResult filteredByAgeSkill={filteredByAgeSkill} />
        <SkillRanking persons={persons} />
      </div>
    </div>
  );
}