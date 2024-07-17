import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';


const ShoeForm = () => {
  const [shoes, setShoes] = useState([])
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const history = useHistory()

  useEffect(() => {
    fetch('/categories')
    .then(res => res.json())
    .then(category => setCategories(category))
    .catch(error => setError(error))
  }, [])

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
      fetch('/shoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brand: values.brand,
          model: values.model,
          category_id: values.category,
          image_url: values.image_url,
        }),
      })
      .then(res => res.json())
      .then(newShoe => { 
        setShoes([...shoes, newShoe])
        resetForm()
        history.push('/')
      })
      .catch(error => setError(error))
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
        <button type='submit'>Add Shoe</button>
      </form>
    </div>
  )
}

export default ShoeForm