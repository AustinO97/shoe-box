import React, { useContext, useEffect } from 'react';
import ShoeCard from './ShoeCard';
import { ShoeContext } from './ShoeContext';

const Shoes = () => {
  const { shoes, setShoes, error, setError } = useContext(ShoeContext)

  useEffect(() => {
    fetch('/shoes')
      .then(res => res.json())
      .then(shoe => setShoes(shoe))
      .catch(error => setError(error))
  }, [setError, setShoes])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const startingShoes = shoes.map((shoe) => {
    return <ShoeCard key={shoe.id} shoe={shoe} />
  })

  return (
    <div className='form-container'>
      <h1 className='header'>Shoe Box</h1>
      <div className='shoe-container'>
        {startingShoes}
      </div>
    </div>
  )
}

export default Shoes
