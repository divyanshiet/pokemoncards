import React, { useState, useEffect } from 'react';
import PokemonCard from './components/pokemoncard/Pokemoncard';
import SearchBar from './components/searchbar/Searchbar';
import './App.css';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        const promises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        });
        const results = await Promise.all(promises);
        setPokemonList(results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };
    fetchPokemonData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="app-container">
      <h1>Pokémon Cards</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
