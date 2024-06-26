import React, { useEffect, useState } from 'react';
import ShoeCard from './ShoeCard';

function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/shoes')
      .then(res => res.json())
      .then(
        (shoe) => {
          setShoes(shoe);
        },
        (error) => {
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const startingShoes = shoes.map((shoe) => {
    return <ShoeCard key={shoe.id} shoe={shoe} />
  })

  return (
    <div className='container'>
      <h1 className='header'>
        Shoe Box
      </h1>
      <div className='shoe-container'>
        {startingShoes}
      </div>
    </div>
  );
}

export default Shoes;
