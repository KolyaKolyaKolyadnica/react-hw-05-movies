import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ThemoviedbApi from 'services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function ReviewsViews({ test }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    api
      .fetchReviewsById(movieId)
      .then(dataReviews => setReviews(dataReviews))
      .catch(err => setError(err));
  }, []);

  return (
    <>
      {reviews && reviews.results.length !== 0 ? (
        <ul>
          {reviews.results.map(review => {
            return (
              <li key={review.id}>
                <h4>{review.author}</h4>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There are no reviews unfortunately.</p>
      )}

      {error && <div>ERROR! {error.message}</div>}
    </>
  );
}

export default ReviewsViews;
