import { useState, useEffect } from 'react';
import * as fetchMovieAPI from '../../services/movieApi';
import Gallery from 'components/Gallery/Gallery';

import { Status } from '../../utils/status';
import IdleView from 'components/IdleView/IdleView';
import ErrorView from 'components/ErrorView/ErrorView';
import Loading from 'components/Loader/Loader';

import s from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    fetchMovieAPI
      .fetchPopular()
      .then(data => {
        setMovies(data.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, []);

  if (status === Status.IDLE) {
    return <IdleView />;
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  if (status === Status.RESOLVED) {
    return (
      <div>
        <h2 className={s.title}>Trending today</h2>

        {movies && <Gallery movies={movies} />}
      </div>
    );
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={'Sorry something went wrong'} />;
  }
}

export default HomePage;
