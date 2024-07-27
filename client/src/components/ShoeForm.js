import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { fetchCategories, selectCategories } from '../redux/categorySlice';
import { addShoe } from '../redux/shoeSlice';

const ShoeForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const categories = useSelector(selectCategories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const validationSchema = yup.object({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required'),
    category: yup.string().required('Category is required'),
    image_url: yup.string().url('Invalid URL').required('Image URL is required')
  })

  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      category: '',
      image_url: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addShoe({
        brand: values.brand,
        model: values.model,
        category_id: values.category,
        image_url: values.image_url
      }))
        .unwrap()
        .then(() => {
          resetForm()
          history.push('/')
        })
        .catch((error) => {
          console.error('Failed to add the shoe: ', error)
        })
    }
  })

  return (
    <div className='form-container'>
      <h1 className='header'>Shoe Box</h1>
      <form id='shoe-form' onSubmit={formik.handleSubmit} className='shoe-form'>
        <h3>Add New Shoe</h3>
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
            {Array.isArray(categories) && categories.map(category => (
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
        <button type='submit'>Add Shoe</button>
      </form>
    </div>
  )
}

export default ShoeForm
