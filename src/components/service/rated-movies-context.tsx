import React, { ReactNode, createContext, useContext, useState } from 'react';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    genres: { id: number; name: string }[];
    overview: string;
    apiKey: string;
    serverRating: number; // Общий рейтинг с сервера
    userRating: number; // Рейтинг, установленный пользователем
  }

interface RatedMoviesContextType {
  ratedMovies: Movie[];
  addRatedMovie: (movie: Movie, vote_average: number) => void;
  handleRatingChange: (movieId: number, newRating: number) => void;
}

const RatedMoviesContext = createContext<RatedMoviesContextType | null>(null);

export const useRatedMovies = () => {
  const context = useContext(RatedMoviesContext);
  if (!context) {
    throw new Error('useRatedMovies must be used within a RatedMoviesProvider');
  }
  return context;
};

export const RatedMoviesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);

  const handleRatingChange = (movieId: number, newRating: number) => {
    setRatedMovies((prevMovies) =>
      prevMovies.map(movie =>
        movie.id === movieId ? { ...movie, userRating: newRating } : movie
      )
    );
  };

  const addRatedMovie = (movie: Movie, rating: number) => {
    const existingIndex = ratedMovies.findIndex((m) => m.id === movie.id);
    if (existingIndex !== -1) {
      // Если фильм уже оценен, обновляем его рейтинг
      const updatedMovies = [...ratedMovies];
      updatedMovies[existingIndex].userRating = rating; // Обновляем рейтинг, установленный пользователем
      setRatedMovies(updatedMovies);
    } else {
      // Если фильм не оценен, добавляем его
      const ratedMovie = { ...movie, userRating: rating }; // Сохраняем рейтинг, установленный пользователем
      setRatedMovies(prevMovies => [...prevMovies, ratedMovie]);
    }
  };
  

  return (
    <RatedMoviesContext.Provider value={{ ratedMovies, addRatedMovie, handleRatingChange }}>
      {children}
    </RatedMoviesContext.Provider>
  );
};