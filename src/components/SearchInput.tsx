import React, { useState } from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchTermChange }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      onSearchTermChange('');
    }
  };

  return (
    <div className="inline-flex items-center">
      <button 
        onClick={toggleSearch}
        className="p-2 rounded-md hover:bg-custom-grey transition-colors"
        aria-label="Toggle search"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-custom-black" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>
      
      {isSearchVisible && (
        <div className="ml-2 transition-all duration-300 ease-in-out">
          <input
            type="text"
            placeholder="Search..."
            className="shadow appearance-none border rounded py-2 px-3 text-custom-black leading-tight focus:outline-none focus:shadow-outline bg-white"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default SearchInput;
