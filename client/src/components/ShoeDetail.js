// src/components/ShoeDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CategoryContext } from './CategoryContext';


const ShoeDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const [shoe, setShoe] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const { categories, setCategories, error, setError } = useContext(CategoryContext)

  useEffect(() => {
    fetch(`/shoes/${id}`)
      .then(res => res.json())
      .then((shoe) => {
        setShoe(shoe)
        formik.setValues({
          brand: shoe.brand,
          model: shoe.model,
          category: shoe.category ? shoe.category.id : '',
          image_url: shoe.image_url,
        })
      })
      .catch(error => setError(error))
  }, [])

  const validationSchema = yup.object({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required'),
    category: yup.string().required('Category is required'),
    image_url: yup.string().required('Image URL is required').url('Must be a valid URL'),
  })

  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      category: '',
      image_url: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch(`/shoes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: values.brand,
          model: values.model,
          category_id: values.category,
          image_url: values.image_url,
        }),
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
  })

  const handleDelete = () => {
    fetch(`/shoes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
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
    formik.resetForm()
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!shoe) {
    return <div>Loading...</div>
  }

  return (
    <div className='shoe-detail'>
      {isEditing ? (
        <div>
          <h2>Edit Shoe</h2>
          <form id='shoe-form' onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id='brand'
                name='brand'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
              />
              {formik.touched.brand && formik.errors.brand ? (
                <div>{formik.errors.brand}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor='model'>Model</label>
              <input
                id='model'
                name='model'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.model}
              />
              {formik.touched.model && formik.errors.model ? (
                <div>{formik.errors.model}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor='category'>Category</label>
              <select
                id='category'
                name='category'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <option value='' label='Select category' />
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category ? (
                <div>{formik.errors.category}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor='image_url'>Image URL</label>
              <input
                id='image_url'
                name='image_url'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.image_url}
              />
              {formik.touched.image_url && formik.errors.image_url ? (
                <div>{formik.errors.image_url}</div>
              ) : null}
            </div>
            <button type='submit'>Save Changes</button>
            <br />
            <button type='button' onClick={handleCancelEdit}>Cancel</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>{shoe.model}</h2>
          <p>{shoe.brand}</p>
          <p>{shoe.category ? shoe.category.name : 'No category'}</p>
          <img src={shoe.image_url} alt={shoe.model} />
          <button className='delete-button' onClick={handleDelete}>Remove Shoe</button>
          <br />
          <button className='edit-button' onClick={handleEditToggle}>Edit Shoe</button>
        </div>
      )}
    </div>
  )
}

export default ShoeDetail
