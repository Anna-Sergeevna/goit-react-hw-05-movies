import background from './searchMovies.jpg';
import s from './SearchIdleView.module.css';

function SearchIdleView() {
  return (
    <div className={s.searchIdleView} role="alert">
      <img src={background} alt="Search" width="700" />
    </div>
  );
}

export default SearchIdleView;
