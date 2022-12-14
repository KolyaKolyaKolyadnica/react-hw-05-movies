import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ReviewsListItem from 'components/ReviewsListItem';
import ThemoviedbApi from 'services/ThemoviedbApi';
const api = new ThemoviedbApi({});

function ReviewsViews() {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    api
      .fetchReviewsById(movieId)
      .then(dataReviews => setReviews(dataReviews))
      .catch(err => setError(err));
  }, []);

  const listItem =
    reviews &&
    reviews.results.map(review => {
      return <ReviewsListItem key={review.id} review={review} />;
    });

  return (
    <>
      {reviews?.results?.length > 0 ? (
        <ul>{listItem}</ul>
      ) : (
        <p>There are no reviews unfortunately.</p>
      )}

      {error && <div>ERROR! {error.message}</div>}
    </>
  );
}

export default ReviewsViews;
