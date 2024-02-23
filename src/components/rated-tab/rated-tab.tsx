import React from 'react';
import { useRatedMovies } from '../service/rated-movies-context'
import MovieCard from '../movie-card';

const RatedTab: React.FC = () => {

  const { ratedMovies, handleRatingChange } = useRatedMovies();

  return (
    <div>
      <h2>Your Rated Movies</h2>
      {ratedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} apiKey='' isRatedTab={true} handleRatingChange={handleRatingChange}/>
      ))}
    </div>
  );
};

export default RatedTab;
