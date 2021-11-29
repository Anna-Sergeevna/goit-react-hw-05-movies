import { Link, useLocation } from 'react-router-dom';
import { URL } from '../../services/settings-url';

import s from './Gallery.module.css';

function Gallery({ movies }) {
  const location = useLocation();

  return (
    <ul className={s.gallery}>
      {movies.map(movie => (
        <li className={s.item} key={movie.id} id={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              className={s.image}
              src={`${URL.IMAGE}${movie.poster_path}`}
              alt={movie.title || movie.name}
            ></img>
            <h3 className={s.titleMovie}>{movie.title || movie.name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Gallery;
