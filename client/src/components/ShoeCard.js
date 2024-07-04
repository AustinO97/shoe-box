import React from 'react';
import { Link } from 'react-router-dom';


const ShoeCard = ({ shoe }) => {
    const { brand, image_url, model, id } = shoe


  return (
    <div className='shoe-card'>
      <Link to={`/shoes/${id}`}>
        <h4>{brand} {model}</h4>
        <img 
        src={image_url}
        alt={brand}
        className='shoe-image' />
        <br/>
      </Link>
    </div>
  )
}

export default ShoeCard