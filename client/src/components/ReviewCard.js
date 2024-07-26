import React from 'react';

const ReviewCard = ({ review }) => {
  const { content, rating, shoe, user } = review;

  return (
    <div className="review-card">
      <h3>Review by {user.username}</h3>
      <h4>{shoe.brand} {shoe.model}</h4>
      <img src={shoe.image_url} alt={shoe.brand} className="shoe-image" />
      <p>{content}</p>
      <div className="rating">Rating: {rating}/5</div>
			<p>Category: {review.shoe.category.name}</p>
    </div>
  );
};

export default ReviewCard;
