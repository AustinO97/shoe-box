import React, { useEffect, useState } from 'react';

function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/shoes')
      .then(res => res.json())
      .then(
        (result) => {
          setShoes(result);
        },
        (error) => {
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Shoes</h2>
      <ul>
        {shoes.map(shoe => (
          <li key={shoe.id}>{shoe.model} - {shoe.brand}</li>
        ))}
      </ul>
    </div>
  );
}

export default Shoes;
