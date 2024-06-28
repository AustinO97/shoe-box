import React from 'react';


const ReviewCard = ({ review }) => {
    const { content, rating, user } = review;

    return (
        <div className="review-card">
            <h3>Review by {user.username}</h3>
            <h4>{review.shoe.brand} {review.shoe.model}</h4>
            <img 
            src={review.shoe.image_url}
            alt={review.shoe.brand}
            className="shoe-image" />
            <p>{content}</p>
            <div className="rating">Rating: {rating}/5</div>
        </div>
    );
}

export default ReviewCard;