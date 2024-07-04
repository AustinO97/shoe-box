import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const ShoeDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [shoe, setShoe] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    image_url: ''
  });

  useEffect(() => {
    fetch(`/shoes/${id}`)
      .then(res => res.json())
      .then(
        (shoe) => {
          setShoe(shoe)
          setFormData({
            brand: shoe.brand,
            model: shoe.model,
            image_url: shoe.image_url,
          })
        },
        (error) => {
          setError(error)
        }
      )
  }, [id])

  const handleDelete = () => {
    fetch(`/shoes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        history.push('/')
      })
      .catch(error => {
        setError(error)
      })
  }

  const handleEditToggle = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setFormData({
      brand: shoe.brand,
      model: shoe.model,
      image_url: shoe.image_url,
      user_id: shoe.user_id,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    fetch(`/shoes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then((updatedShoe) => {
        setShoe(updatedShoe)
        setIsEditing(false)
      })
      .catch(error => {
        setError(error)
      })
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!shoe) {
    return <div>Loading...</div>
  }

  if (isEditing) {
    return (
      <div className='shoe-detail'>
        <h2>Edit Shoe</h2>
        <form id='shoe-form' onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              id="brand"
              name="brand"
              type="text"
              onChange={handleInputChange}
              value={formData.brand}
            />
          </div>
          <div>
            <label htmlFor="model">Model</label>
            <input
              id="model"
              name="model"
              type="text"
              onChange={handleInputChange}
              value={formData.model}
            />
          </div>
          <div>
            <label htmlFor="image_url">Image URL</label>
            <input
              id="image_url"
              name="image_url"
              type="text"
              onChange={handleInputChange}
              value={formData.image_url}
            />
          </div>
          <button type="submit">Save Changes</button>
          <br/>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        </form>
      </div>
    )
  }

  return (
    <div className='shoe-detail'>
      <h2>{shoe.model}</h2>
      <p>{shoe.brand}</p>
      <img src={shoe.image_url} alt={shoe.model} />
      <button onClick={handleDelete}>Remove Shoe</button>
      <br/>
      <button onClick={handleEditToggle}>Edit Shoe</button>
    </div>
  )
}

export default ShoeDetail
