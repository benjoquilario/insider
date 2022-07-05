import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const [query, setQuery] = useState('');

  const handleSearch = event => {
    event.preventDefault();
  };

  return (
    <div className="relative" onSubmit={handleSearch}>
      <form className="relative">
        <div aria-live="polite" className="sr-only"></div>
        <input
          name="search"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a user..."
          className="text-sm md:text-base text-white rounded w-full pl-11 p-3 bg-gray-800"
          autoComplete="off"
        />
        <label className="sr-only" htmlFor="search">
          seach for a user...
          <span className="sr-only">and press enter</span>
        </label>
        <Link to={`http://localhost:5000/users/search?q=${query}`}>
          <button
            type="submit"
            className="text-white absolute top-0 bottom-0 flex items-center p-3"
            aria-label="submit search"
          >
            <BiSearch size="1.5em" />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Search;
