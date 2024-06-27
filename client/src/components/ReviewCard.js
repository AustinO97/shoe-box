import React from 'react';


const ReviewCard = ({ review }) => {
    const { content, rating, user } = review;

    return (
        <div className="review-card">
            <h4>Review by {user.username}</h4>
            <p>{content}</p>
            <div className="rating">Rating: {rating}/5</div>
        </div>
    );
}

export default ReviewCard;
