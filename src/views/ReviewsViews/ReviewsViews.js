import { useState, useEffect } from 'react';
import ThemoviedbApi from 'services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function ReviewsViews({ test }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .fetchReviewsById(436270)
      .then(dataReviews => setReviews(dataReviews))
      .catch(err => setError(err));
  }, []);

  return (
    <>
      {reviews && (
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
      )}
    </>
  );
}

export default ReviewsViews;
