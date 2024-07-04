import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ShoeCard from './ShoeCard';


function Shoes() {
  const [shoes, setShoes] = useState([])
  const [error, setError] = useState(null)


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
  }, [])

  const validationSchema = yup.object({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required'),
    image_url: yup.string().url('Invalid URL').required('Image URL is required')
  });

  const formik = useFormik({
    initialValues: {
      brand: '',
      model: '',
      image_url: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetch('/shoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(res => res.json())
      .then(
        (newShoe) => {
          setShoes([...shoes, newShoe])
          resetForm()
        },
        (error) => {
          setError(error)
        }
      )
    }
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const startingShoes = shoes.map((shoe) => {
    return <ShoeCard key={shoe.id} shoe={shoe} />
  })

  return (
    <div className='form-container'>
      <h1 className='header'>Shoe Box</h1>
      <form id='shoe-form' onSubmit={formik.handleSubmit}>
      <h3>Add New Shoe</h3>
      <div>
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            name="brand"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.brand}
          />
          {formik.touched.brand && formik.errors.brand ? (
            <div>{formik.errors.brand}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="model">Model</label>
          <input
            id="model"
            name="model"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.model}
          />
          {formik.touched.model && formik.errors.model ? (
            <div>{formik.errors.model}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="image_url">Image URL</label>
          <input
            id="image_url"
            name="image_url"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image_url}
          />
          {formik.touched.image_url && formik.errors.image_url ? (
            <div>{formik.errors.image_url}</div>
          ) : null}
        </div>
        <button type="submit">Add Shoe</button>
      </form>
      <div className='shoe-container'>
        {startingShoes}
      </div>
    </div>
  );
}

export default Shoes;
