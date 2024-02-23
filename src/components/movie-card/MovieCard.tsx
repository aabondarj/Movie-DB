import React, {useEffect, useState} from 'react';
import { Card, Rate } from 'antd';
import { format } from 'date-fns';
import './MovieCard.css'
import { useGenres } from '../service/genre';
import MovieSearchService from '../service/movie-search';
import { useRatedMovies } from '../service/rated-movies-context';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genres: { id: number; name: string }[];
  overview: string;
  apiKey: string
  serverRating: number; // Общий рейтинг с сервера
  userRating: number; 
}

interface Props {
  movie: Movie;
  apiKey: string;
  isRatedTab: boolean
  handleRatingChange: (movieId: number, newRating: number) => void;
}



const MovieCard: React.FC<Props> = ({ movie, apiKey, isRatedTab, handleRatingChange }) => {

  const { genres } = useGenres();
  const { addRatedMovie } = useRatedMovies();

  const [shortDescription, setShortDescription] = useState('');

  const handleRateChange = (value: number) => {
    addRatedMovie(movie, value);
  };
  
  

  useEffect(() => {
    if (movie.overview.length > 200) {
      const shortenedText = movie.overview.substring(0, 100).trimEnd();
      const lastSpaceIndex = shortenedText.lastIndexOf(' ');
      setShortDescription(shortenedText.substring(0, lastSpaceIndex) + '...');
    } else {
      setShortDescription(movie.overview);
    }
  }, [movie.overview]);


  const getColor = () => {
    if (movie.vote_average <= 3) return '#E90000';
    if (movie.vote_average <= 5) return '#E97E00';
    if (movie.vote_average <= 7) return '#E9D100';
    return '#66E900';
  };

  

  return (
    <Card hoverable style={{ width: '100%', marginBottom: '20px' }} className='movie-card-content'>
      <div style={{ display: 'flex' }}>
        <div className='img-poster'>
          <img
            alt={movie.title}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://xn--90aha1bhcc.xn--p1ai/img/placeholder.png'}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div style={{ flex: 1, marginLeft: '1rem'}}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ marginRight: '1rem' }} className='movie-card-title'>{movie.title}</h2>
            <div className='movie-card-rating' style={{borderColor: getColor(), minWidth: '30px'}}>
              {(movie.vote_average).toFixed(1)}
            </div>
          </div>
          {movie.release_date && <p>{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {genres
            .filter((genre) => movie.genres && movie.genres.some((movieGenre) => movieGenre.id === genre.id))
            .map((genre) => (
              <div key={genre.id} style={{ backgroundColor: '#FAFAFA', border: '1px solid #D9D9D9', borderRadius: '2px', padding: '5px', margin: '0', marginRight: '5px' }}>
                {genre.name}
              </div>
            ))}
          </div>
          <div className='desktop-description'>
            <p>{shortDescription}</p>
            <Rate allowHalf defaultValue={isRatedTab ? movie.userRating : 0}  onChange={(userRating) => handleRateChange(userRating)}/>
          </div>
        </div>
      </div>
      <div className='mobile-description'>
        <p>{shortDescription}</p>
        <Rate allowHalf defaultValue={isRatedTab ? movie.userRating : 0} onChange={(userRating) => handleRateChange(userRating)}/>
      </div>
    </Card>
  );
};

export default MovieCard;