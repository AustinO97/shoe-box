import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateShoe, deleteShoe, fetchShoes, selectShoes } from '../redux/shoeSlice';
import { fetchCategories, selectCategories } from '../redux/categorySlice';

const ShoeDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const shoes = useSelector(selectShoes)
  const categories = useSelector(selectCategories)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    dispatch(fetchShoes())
    dispatch(fetchCategories())
  }, [dispatch])

  const shoe = shoes.find((shoe) => shoe.id === parseInt(id))

  const validationSchema = yup.object({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required'),
    category: yup.string().required('Category is required'),
    image_url: yup
      .string()
      .required('Image URL is required')
      .url('Must be a valid URL'),
  })

  const formik = useFormik({
    initialValues: {
      brand: shoe?.brand || '',
      model: shoe?.model || '',
      category: shoe?.category_id || '',
      image_url: shoe?.image_url || '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        updateShoe({
          id: shoe.id,
          brand: values.brand,
          model: values.model,
          category_id: values.category,
          image_url: values.image_url,
        })
      )
        .unwrap()
        .then(() => {
          history.push('/')
        })
        .catch((error) => {
          console.error('Failed to update the shoe: ', error)
        })
    },
  })

  const handleDelete = () => {
    dispatch(deleteShoe(shoe.id))
      .unwrap()
      .then(() => {
        history.push('/')
      })
      .catch((error) => {
        console.error('Failed to delete the shoe: ', error)
      })
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
              <label htmlFor='brand'>Brand</label>
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
                {categories.map((category) => (
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
            <button type='button' onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>{shoe.model}</h2>
          <p>{shoe.brand}</p>
          <p>{shoe.category ? shoe.category.name : 'No category'}</p>
          <img src={shoe.image_url} alt={shoe.model} />
          <button className='delete-button' onClick={handleDelete}>
            Remove Shoe
          </button>
          <button className='edit-button' onClick={() => setIsEditing(true)}>
            Edit Shoe
          </button>
        </div>
      )}
    </div>
  )
}

export default ShoeDetail
