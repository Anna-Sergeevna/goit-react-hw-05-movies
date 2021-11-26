import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './SearchForm.module.css';

function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Enter the queryn');
      setQuery('');
      return;
    }

    onSubmit(query);
    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <form className={s.searchForm} onSubmit={handleSubmit}>
      {/* // <form className={s.searchForm}> */}
      <input
        className={s.searchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={query}
        onChange={handleChange}
      />

      <button type="submit" disabled={!query} className={s.searchFormButton}>
        {/* <button type="submit" className={s.searchFormButton}> */}
        <span className={s.searchFormButtonLabel}>Search</span>
      </button>
    </form>
  );
}

export default SearchForm;
