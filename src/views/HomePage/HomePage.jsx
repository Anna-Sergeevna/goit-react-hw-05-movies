import { useState, useEffect } from 'react';
import * as fetchMovieAPI from '../../services/movieApi';
// import { IMG_BASE_URL } from '../../services/movieApi';
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
        <ul className={s.gallery}>
          {movies.map(movie => (
            <li className={s.item} key={movie.id}>
              <img
                className={s.image}
                src={`${fetchMovieAPI.URL.IMAGE}${movie.poster_path}`}
                alt={movie.title || movie.name}
              ></img>
              <h3 className={s.titleMovie}>{movie.title || movie.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
