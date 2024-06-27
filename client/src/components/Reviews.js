import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/reviews')
      .then(res => res.json())
      .then(
        (review) => {
            setReviews(review);
        },
        (error) => {
            setReviews(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Reviews</h2>
        {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
        ))}
    </div>
  );
}

export default Reviews;
