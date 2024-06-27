import React from 'react';


const ShoeCard = ({ shoe }) => {
    const { brand, image_url, model } = shoe


  return (
    <div className='shoe-card'>
        <h4>{brand} {model}</h4>
        <img 
        src={image_url}
        alt={brand}
        className="shoe-image" />
        <br/>
          <button >Remove Shoe</button>
          <div className="review-card">
              <h4>Review by {shoe.user.username}</h4>
              <p>{shoe.user.reviews[0].content}</p>
          <div className="rating">Rating: {}/5</div>
        </div>
    </div>
  )
}

export default ShoeCard