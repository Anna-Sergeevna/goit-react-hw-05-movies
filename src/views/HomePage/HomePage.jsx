import { useState, useEffect } from 'react';
import * as fetchMovieAPI from '../../services/movieApi';
import s from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieAPI.fetchPopular().then(setMovies);
  }, []);

  return (
    <div>
      <h2 className={s.title}>Trending today</h2>

      {/* {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.results.id}>{movie.results.title}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default HomePage;
