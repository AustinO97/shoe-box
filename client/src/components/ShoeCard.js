import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';


const ShoeCard = ({ shoe }) => {
    const [isLiked, setIsLiked] = useState(false)
    const { brand, image_url, reviews, model } = shoe



  return (
    <div className='shoe-card'>
        <h4>{brand} {model}</h4>
        <img 
        src={image_url}
        alt={brand}
        className="shoe-image" />
        <br/>
            <button >Remove Shoe</button>
            <h5>Reviews:</h5>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                <div key={review.id}>
                    <p>{review.content}</p>
                    <p>Rating: {review.rating}</p>
                </div>
                ))
            ) : (
            <p>No reviews yet.</p>
            )}
    </div>
  )
}

export default ShoeCard