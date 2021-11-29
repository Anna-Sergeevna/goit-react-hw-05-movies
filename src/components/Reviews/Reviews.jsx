import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as fetchMovieAPI from '../../services/movieApi';

import { Status } from '../../utils/status';
import IdleView from 'components/IdleView/IdleView';
import ErrorView from 'components/ErrorView/ErrorView';
import Loading from 'components/Loader/Loader';

import s from './Reviews.module.css';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    fetchMovieAPI
      .fetchReviews(movieId)
      .then(data => {
        setReviews(data.results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }

  if (status === Status.IDLE) {
    return (
      <>
        <IdleView />;
      </>
    );
  }

  if (status === Status.PENDING) {
    return <Loading />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        {reviews && (
          <>
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <h3 className={s.title}>Author: {review.author}</h3>
                  <p className={s.info}>{review.content}</p>
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

export default Reviews;
