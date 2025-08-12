import { useState } from "react";
import SearchBox from "./components/SearchBox";
import SortDropdown from "./components/SortDropdown";
import CategoryFilter from "./components/CategoryFilter";
import CompanyTable from "./components/CompanyTable";

export default function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(companies.map(company => company.category))];

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
  };

  const filteredAndSortedCompanies = () => {
    let result = [...companies];

    if (appliedSearchTerm) {
      result = result.filter(company =>
        company.name.toLowerCase().includes(appliedSearchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(company => company.category === selectedCategory);
    }

    if (sortOption === 'year-asc') {
      result.sort((a, b) => a.start - b.start);
    } else if (sortOption === 'year-desc') {
      result.sort((a, b) => b.start - a.start);
    } else if (sortOption === 'duration') {
      result.sort((a, b) => (a.end - a.start) - (b.end - b.start));
    }

    return result;
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-primary text-center">Company List</h1>
      <div className="bg-white rounded shadow p-4">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
        />
        <div className="row mb-4">
          <div className="col-md-6">
            <SortDropdown
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
          <div className="col-md-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />
          </div>
        </div>
        <CompanyTable companies={filteredAndSortedCompanies()} />
        </div>
    </div>
  );
}