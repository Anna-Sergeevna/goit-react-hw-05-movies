import { useState } from 'react';
import SearchForm from '../../components/SearchForm';
// import * as fetchMovieAPI from '../../services/movieApi';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './MoviesPage.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   fetchMovieAPI.fetchSearchQuery().then(data => setMovies(data.results));
  // }, [query]);

  const onSubmit = query => {
    setQuery(query);
  };

  return (
    <div className={s.moviesPage}>
      <SearchForm onSubmit={onSubmit} query={query} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default MoviesPage;
