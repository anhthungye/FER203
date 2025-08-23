import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search..." }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;