import { useState, useEffect } from 'react';
import {
  NavLink,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import * as fetchMovieAPI from '../../services/movieApi';
import { URL } from '../../services/settings-url';

import { Status } from '../../utils/status';
import IdleView from 'components/IdleView/IdleView';
import ErrorView from 'components/ErrorView/ErrorView';
import Loading from 'components/Loader/Loader';

import defaultPoster from './defaultPoster.jpg';
import s from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(Status.PENDING);

    fetchMovieAPI
      .fetchMovieById(movieId)
      .then(data => {
        setMovie(data);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  if (status === Status.IDLE) {
    return (
      <>
        <IdleView />;
      </>
    );
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  const onGoBack = () => {
    navigate(location?.state?.from ?? '/');
  };

  if (status === Status.RESOLVED) {
    return (
      <>
        {movie && (
          <>
            <button className={s.button} type="button" onClick={onGoBack}>
              Go back
            </button>
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
                <h2 className={s.titleMovie}>
                  {movie.title || movie.name} ({movie.release_date.slice(0, 4)})
                </h2>
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

  if (status === Status.REJECTED) {
    return <ErrorView message={'Sorry something went wrong'} />;
  }
}

export default MovieDetailsPage;

// .then(setMovie) = data => setMovie(data);
