import React, { useEffect } from 'react';
import ShoeCard from './ShoeCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShoes, selectShoes } from '../redux/shoeSlice';

const Shoes = () => {
  const dispatch = useDispatch()
  const shoes = useSelector(selectShoes)
  const error = useSelector(state => state.shoes.error)
  const loading = useSelector(state => state.shoes.loading)

  useEffect(() => {
    dispatch(fetchShoes())
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='form-container'>
      <h1 className='header'>Shoe Box</h1>
      <div className='shoe-container'>
        {shoes.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  )
}

export default Shoes
