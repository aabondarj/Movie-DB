import React, {useState} from 'react';
import MovieList from '../movie-list';
import SearchInput from '../search-input';

const SearchTab: React.FC = () => {

  const _apiKey = 'b312fd85ec2e234e12bf06a786ff0ffe';

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <SearchInput onSearch = {handleSearch}/>
      <MovieList searchQuery={searchQuery} apiKey={_apiKey}/>
  </div>
  );
};

export default SearchTab;
