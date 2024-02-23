import React from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
const { Search } = Input;

interface Props {
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<Props> = ({ onSearch }) => {
  
  const delayedSearch = debounce((value: string) => {
    onSearch(value)
  }, 500)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    delayedSearch(e.target.value);
  };

  return <Search placeholder="Enter movie title" onChange={handleSearch} style={{ width: '100%' }} />;
};

export default SearchInput;
