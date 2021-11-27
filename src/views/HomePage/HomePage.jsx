import { useState, useEffect } from 'react';
import * as fetchMovieAPI from '../../services/movieApi';
// import {IMG_BASE_URL} from ''
import s from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieAPI.fetchPopular().then(data => setMovies(data.results));
  }, []);

  return (
    <div>
      <h2 className={s.title}>Trending today</h2>

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <img
                src={`${fetchMovieAPI.IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title || movie.name}
              ></img>
              {movie.title || movie.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
