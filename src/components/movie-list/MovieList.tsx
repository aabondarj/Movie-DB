import React, { useEffect, useState, useMemo } from 'react';
import { Spin, Alert, Pagination } from 'antd';
import MovieCard from '../movie-card';
import './MovieList.css'; // Подключаем CSS файл для стилей
import MovieSearchService from '../service/movie-search';
import { useRatedMovies } from '../service/rated-movies-context';

interface Props {
  searchQuery: string;
  apiKey: string;
  showRatedOnly?: boolean;
}

const MovieList: React.FC<Props> = ({searchQuery, apiKey}) => {

  const moviesService = useMemo(() => new MovieSearchService(apiKey), [apiKey]);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true);
        const fetchedMovies = await moviesService.getMoviesQuery(searchQuery, currentPage)
        console.log(fetchedMovies);
        setMovies(fetchedMovies.results)
        setTotalPages(fetchedMovies.total_pages)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
        console.error(`Ошибка при загрузке фильмов: ${error}`)
      }
    }

    fetchData();
  }, [currentPage, moviesService, searchQuery]);

  const errorMessage = error && 
    (<Alert
      message="An error has occurred"
      description="We apologize, something went wrong. We are already working on this!"
      type="error"
      closable
    />)
  const spin = loading ? <Spin size="large" /> : null

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { handleRatingChange } = useRatedMovies();

  return (
    <div className="movie-list-container"> {/* Обертка для центрирования рядов */}
      <div className="movie-row"> {/* Ряд с карточками */}
      {movies.length === 0 && !(loading || error) && <p>No results found.</p>}
      {errorMessage}
      {spin}
        {movies.map((movie: any) => (
          <div key={movie.id} className="movie-card-container"> {/* Обертка для карточки */}
            {!(loading || error) && <MovieCard movie={movie} apiKey={apiKey} isRatedTab={false} handleRatingChange={handleRatingChange} />}
          </div>
        ))}
      </div>
      { (totalPages > 1 &&
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={totalPages}
          pageSize={10}
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
      )}
    </div>
  );
};

export default MovieList;