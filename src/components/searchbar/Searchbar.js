import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokémon..."
      value={searchTerm}
      onChange={handleSearch}
      className="search-bar"
    />
  );
};

export default SearchBar;
