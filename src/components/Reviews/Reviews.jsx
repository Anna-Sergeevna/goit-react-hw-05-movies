import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import * as fetchMovieAPI from '../../services/movieApi';

import s from './Reviews.module.css';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieAPI.fetchReviews(movieId).then(data => setReviews(data.results));
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>We don't have any reviews for this movie.</p>;
  }

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

export default Reviews;
