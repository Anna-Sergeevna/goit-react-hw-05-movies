import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as fetchMovieAPI from '../../services/movieApi';
import { URL } from '../../services/settings-url';
import defaultActor from './defaultActor.jpg';

import { Status } from '../../utils/status';
import IdleView from 'components/IdleView/IdleView';
import ErrorView from 'components/ErrorView/ErrorView';
import Loading from 'components/Loader/Loader';

import s from './Cast.module.css';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    fetchMovieAPI
      .fetchCast(movieId)
      .then(data => {
        setCast(data.cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  if (status === Status.IDLE) {
    return <IdleView />;
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  if (status === Status.RESOLVED) {
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

  if (status === Status.REJECTED) {
    return <ErrorView message={'Sorry something went wrong'} />;
  }
}

export default Cast;
