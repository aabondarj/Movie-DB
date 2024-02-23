import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import MovieSearchService from '../service/movie-search';

interface Genre {
  id: number;
  name: string;
}

interface GenresContextType {
  genres: Genre[];
}

const GenresContext = createContext<GenresContextType | null>(null);

export const useGenres = () => {
  const context = useContext(GenresContext);
  if (!context) {
    throw new Error('useGenres must be used within a GenresProvider');
  }
  return context;
};

interface GenresProviderProps {
  children: React.ReactNode;
}

export const GenresProvider: React.FC<GenresProviderProps> = ({ children }) => {
  const moviesService = useMemo(() => new MovieSearchService('b312fd85ec2e234e12bf06a786ff0ffe'), []);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
        try {
          const fetchedGenres = await moviesService.getGenres();
          setGenres(fetchedGenres);
        } catch (error) {
          console.error('Error fetching genres:', error);
        }
      };
  
      const createGuestSession = async () => {
        try {
          await moviesService.createGuestSession();
        } catch (error) {
          console.error('Error creating guest session:', error);
        }
      };
  
      fetchGenres();
      createGuestSession();
  }, [moviesService]);

  return <GenresContext.Provider value={{ genres }}>{children}</GenresContext.Provider>;
};
