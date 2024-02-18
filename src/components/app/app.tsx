import React from 'react';
import MovieList from '../movie-list';
import './app.css'

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Movie Search App</h1>
      <MovieList />
    </div>
  );
};

export default App;
