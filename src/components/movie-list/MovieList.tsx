// import React, { useEffect, useState } from 'react';
// import MovieCard from './MovieCard';

// const MovieList: React.FC = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetch(`https://api.themoviedb.org/3/search/movie?api_key=b312fd85ec2e234e12bf06a786ff0ffe&query=return`)
//       .then(response => response.json())
//       .then((data) => setMovies(data.results))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <>
//       {movies.map((movie: any) => (
//         <MovieCard key={movie.id} movie={movie} />
//       ))}
//     </>
//   );
// };

// export default MovieList;

// console.log(data.results)
// setMovies(data.results)

// MovieList.tsx

// MovieList.tsx

// MovieList.tsx

import React, { useEffect, useState } from 'react';
import MovieCard from '../movie-card';
import './MovieList.css'; // Подключаем CSS файл для стилей

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=b312fd85ec2e234e12bf06a786ff0ffe&query=return')
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="movie-list-container"> {/* Обертка для центрирования рядов */}
      <div className="movie-row"> {/* Ряд с карточками */}
        {movies.map((movie: any) => (
          <div key={movie.id} className="movie-card-container"> {/* Обертка для карточки */}
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
