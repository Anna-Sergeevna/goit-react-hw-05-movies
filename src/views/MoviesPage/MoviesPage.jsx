import SearchForm from '../../components/SearchForm';
import s from './MoviesPage.module.css';
import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MoviesPage() {
  const [query, setQuery] = useState('');

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
