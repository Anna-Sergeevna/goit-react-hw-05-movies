import { useState, useEffect } from 'react';
import { NavLink, useParams, Outlet } from 'react-router-dom';

import * as fetchMovieAPI from '../../services/movieApi';
import { URL } from '../../services/settings-url';
import defaultPoster from './defaultPoster.jpg';

import s from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <div className={s.movieCard}>
            <img
              src={
                movie.poster_path
                  ? `${URL.IMAGE}${movie.poster_path}`
                  : defaultPoster
              }
              alt={movie.title || movie.name}
            />
            <div className={s.description}>
              <h2 className={s.titleMovie}>{movie.title || movie.name}</h2>
              <h3 className={s.title}>Genres</h3>
              <ul>
                {movie.genres.map(({ id, name }) => (
                  <li className={s.infoItem} key={id}>
                    {name}
                  </li>
                ))}
              </ul>
              <h3 className={s.title}>Overview </h3>
              <p className={s.info}>{movie.overview}</p>
              <h3 className={s.title}>Score </h3>
              <p className={s.info}>{movie.vote_average}</p>
              <h3 className={s.title}>Votes </h3>
              <p className={s.info}>{movie.vote_count}</p>
              <h3 className={s.title}>Runtime </h3>
              <p className={s.info}>{movie.runtime} min</p>
            </div>
          </div>
        </>
      )}
      <hr />
      <h3>Additional information</h3>
      <div>
        <NavLink
          to="cast"
          className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        >
          Cast
        </NavLink>

        <NavLink
          to="reviews"
          className={({ isActive }) => (isActive ? s.activeLink : s.link)}
        >
          Reviews
        </NavLink>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

export default MovieDetailsPage;

// data => setMovie(data);

// const [movie, setMovie] = useState({});

// ({movie.release_date.slice(0, 4)})
