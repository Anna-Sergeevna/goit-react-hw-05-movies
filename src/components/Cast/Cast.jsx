import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as fetchMovieAPI from '../../services/movieApi';
import { URL } from '../../services/settings-url';
import defaultActor from './defaultActor.jpg';

import s from './Cast.module.css';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieAPI.fetchCast(movieId).then(data => setCast(data.cast));
  }, [movieId]);

  return (
    <>
      {cast && (
        <>
          <ul>
            {cast.map(actor => (
              <li key={actor.id}>
                <img
                  className={s.image}
                  src={
                    actor.profile_path
                      ? `${URL.IMAGE}${actor.profile_path}`
                      : defaultActor
                  }
                  alt={actor.name}
                  width="120"
                />
                <h4 className={s.title}>{actor.name}</h4>
                <p className={s.info}>Character: {actor.character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Cast;
