import SearchForm from '../../components/SearchForm';
import s from './MoviesPage.module.css';

function MoviesPage() {
  return (
    <div className={s.moviesPage}>
      <SearchForm />
    </div>
  );
}

export default MoviesPage;
