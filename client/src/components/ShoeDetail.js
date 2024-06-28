import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const ShoeDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [shoe, setShoe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/shoes/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setShoe(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, [id]);

  const handleDelete = () => {
    fetch(`/shoes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      history.push('/');
    })
    .catch(error => {
      setError(error);
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!shoe) {
    return <div>Loading...</div>;
  }

  return (
    <div className='shoe-detail'>
      <h2>{shoe.model}</h2>
      <p>{shoe.brand}</p>
      <img src={shoe.image_url} alt={shoe.model} />
      <button onClick={handleDelete}>Remove Shoe</button>
    </div>
  );
};

export default ShoeDetail;
