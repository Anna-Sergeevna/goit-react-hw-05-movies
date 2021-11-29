import { useState, useEffect } from 'react';
import SearchForm from '../../components/SearchForm';
import Gallery from '../../components/Gallery/Gallery';

import * as fetchMovieAPI from '../../services/movieApi';

import { Status } from '../../utils/status';
import IdleView from 'components/IdleView/IdleView';
import ErrorView from 'components/ErrorView/ErrorView';
import Loading from 'components/Loader/Loader';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './MoviesPage.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!query) return;
    setStatus(Status.PENDING);

    fetchMovieAPI
      .fetchSearchQuery(query)
      .then(data => {
        if (data.results.length === 0) {
          throw new Error();
        }
        setMovies(data.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [query]);

  const onSubmit = query => {
    setQuery(query);
  };

  if (status === Status.IDLE) {
    return (
      <>
        <SearchForm onSubmit={onSubmit} />
        <IdleView />
      </>
    );
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  if (status === Status.REJECTED) {
    return <ErrorView message={'Sorry we nothing found for you'} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <div className={s.moviesPage}>
        <SearchForm onSubmit={onSubmit} />
        <Gallery movies={movies} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default MoviesPage;
