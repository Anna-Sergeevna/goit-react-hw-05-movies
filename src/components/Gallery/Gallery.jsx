import * as fetchMovieAPI from '../../services/movieApi';
import s from './Gallery.module.css';

function Gallery({ movies }) {
  return (
    <ul className={s.gallery}>
      {movies.map(movie => (
        <li className={s.item} key={movie.id} id={movie.id}>
          <img
            className={s.image}
            src={`${fetchMovieAPI.URL.IMAGE}${movie.poster_path}`}
            alt={movie.title || movie.name}
          ></img>
          <h3 className={s.titleMovie}>{movie.title || movie.name}</h3>
        </li>
      ))}
    </ul>
  );
}

export default Gallery;
