// import React, { useEffect, useState } from 'react';
// import { Card, Rate } from 'antd';
// import { format } from 'date-fns';

// interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   release_date: string;
//   genres: { id: number; name: string }[];
//   overview: string;
// }

// const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
//   const [shortDescription, setShortDescription] = useState('');
//   const releaseDate = new Date(movie.release_date)
//   console.log(releaseDate);
//   useEffect(() => {
//     if (movie.overview.length > 100) {
//       const shortenedText = movie.overview.substring(0, 100).trimEnd();
//       const lastSpaceIndex = shortenedText.lastIndexOf(' ');
//       setShortDescription(shortenedText.substring(0, lastSpaceIndex) + '...');
//     } else {
//       setShortDescription(movie.overview);
//     }
//   }, [movie.overview]);

//   return (
//     <Card hoverable style={{ width: '100%' }}>
//       <div style={{ display: 'flex' }}>
//         <img alt={movie.title} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : ''} style={{ height: '100%' }} />
//         <div style={{ flex: 1, marginLeft: '1rem' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <h2 style={{ marginRight: '1rem' }}>{movie.title}</h2>
//             <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'black', color: 'yellow', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               {movie.vote_average}
//             </div>
//           </div>
//           {movie.release_date && <p>{format(new Date(movie.release_date), 'yyyy-MM-dd')}</p>}
//           <div style={{ display: 'flex', justifyContent: 'start' ,marginTop: '10px' }}>
//             <div style={{ backgroundColor: 'lightgrey', padding: '5px', margin: '0', marginRight: '5px' }}>Action</div>
//             <div style={{ backgroundColor: 'lightgrey', padding: '5px', margin: '0' }}>Drama</div>
//           </div>
//           <p>{movie.genres && movie.genres.map(genre => genre.name).join(', ')}</p>
//           <p>{shortDescription}</p>
//           <Rate allowHalf defaultValue={movie.vote_average / 2} disabled />
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default MovieCard;

////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import { Card, Rate } from 'antd';
// import { format } from 'date-fns';
// import './MovieCard.css';

// interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   release_date: string;
//   genres: { id: number; name: string }[];
//   overview: string;
// }

// const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
//   const [shortDescription, setShortDescription] = useState('');

//   useEffect(() => {
//     if (movie.overview.length > 100) {
//       const shortenedText = movie.overview.substring(0, 100).trimEnd();
//       const lastSpaceIndex = shortenedText.lastIndexOf(' ');
//       setShortDescription(shortenedText.substring(0, lastSpaceIndex) + '...');
//     } else {
//       setShortDescription(movie.overview);
//     }
//   }, [movie.overview]);

//   return (
//     <Card hoverable className="movie-card">
//       <div className="movie-details">
//         <div className="poster-container">
//           <img alt={movie.title} src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : ''} className="poster" />
//         </div>
//         <div className="details">
//           <h2>{movie.title}</h2>
//           <div className="rating">{movie.vote_average}</div>
//           {movie.release_date && <p>{format(new Date(movie.release_date), 'yyyy-MM-dd')}</p>}
//           <div className="genres">
//             {movie.genres && movie.genres.map(genre => (
//               <div key={genre.id} className="genre">{genre.name}</div>
//             ))}
//           </div>
//           <p>{shortDescription}</p>
//           <Rate allowHalf defaultValue={movie.vote_average / 2} disabled />
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default MovieCard;

// MovieCard.tsx

// MovieCard.tsx

// MovieCard.tsx

// MovieCard.tsx

// MovieCard.tsx

// MovieCard.tsx

import React, {useEffect, useState} from 'react';
import { Card, Rate } from 'antd';
import { format } from 'date-fns';
import './MovieCard.css'

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genres: { id: number; name: string }[];
  overview: string;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  
  const isMobile = window.innerWidth < 640;

  const [shortDescription, setShortDescription] = useState('');

  useEffect(() => {
    if (movie.overview.length > 200) {
      const shortenedText = movie.overview.substring(0, 100).trimEnd();
      const lastSpaceIndex = shortenedText.lastIndexOf(' ');
      setShortDescription(shortenedText.substring(0, lastSpaceIndex) + '...');
    } else {
      setShortDescription(movie.overview);
    }
  }, [movie.overview]);

  return (
    <Card hoverable style={{ width: '100%', marginBottom: '20px' }}>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        <div style={{ maxWidth: '300px'}}>
          <img
            alt={movie.title}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://xn--90aha1bhcc.xn--p1ai/img/placeholder.png'}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
        <div style={{ flex: 1, marginLeft: isMobile ? 0 : '1rem', marginTop: isMobile ? '1rem' : 0 }}>
        {/* <div style={{ maxWidth: '300px'}}>
          <img
            alt={movie.title}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://xn--90aha1bhcc.xn--p1ai/img/placeholder.png'}
            style={{ width: '100%', height: 'auto' }}
          />
        </div> */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'space-between' : 'flex-start' }}>
            <h2 style={{ marginRight: '1rem', marginBottom: isMobile ? '0.5rem' : 0 }}>{movie.title}</h2>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'black', color: 'yellow', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {movie.vote_average}
            </div>
          </div>
          {movie.release_date && <p>{format(new Date(movie.release_date), 'MMMM dd, yyyy')}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            {/* {movie.genres && movie.genres.map(genre => (
              <div key={genre.id} style={{ backgroundColor: 'lightgrey', padding: '5px', marginRight: '5px', marginBottom: '5px' }}>{genre.name}</div>
            ))} */}
            <div style={{ backgroundColor: '#FAFAFA', border: '1px solid #D9D9D9', borderRadius: '2px', padding: '5px', margin: '0', marginRight: '5px',  }}>Action</div>
            <div style={{ backgroundColor: '#FAFAFA', border: '1px solid #D9D9D9', borderRadius: '2px', padding: '5px', margin: '0' }}>Drama</div>
          </div>
          <p>{shortDescription}</p>
          <Rate allowHalf defaultValue={movie.vote_average / 2} disabled />
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
