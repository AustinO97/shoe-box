import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { fetchReviews, addReview, selectReviews } from '../redux/reviewSlice';
import { fetchUsers, selectUsers } from '../redux/userSlice';
import { fetchShoes, selectShoes } from '../redux/shoeSlice';
import ReviewCard from './ReviewCard';

const Reviews = () => {
  const dispatch = useDispatch()
  const reviews = useSelector(selectReviews)
  const users = useSelector(selectUsers)
  const shoes = useSelector(selectShoes)

  useEffect(() => {
    dispatch(fetchReviews())
    dispatch(fetchUsers())
    dispatch(fetchShoes())
  }, [dispatch])

  const validationSchema = yup.object({
    content: yup.string().required('Content is required'),
    rating: yup.number().required('Rating is required').min(1).max(5),
    shoe_id: yup.string().required('Shoe is required'),
    user_id: yup.string().required('User is required')
  })

  const formik = useFormik({
    initialValues: {
      content: '',
      rating: '',
      shoe_id: '',
      user_id: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addReview(values))
        .unwrap()
        .then(() => {
          resetForm()
        })
        .catch((error) => {
          console.error('Failed to add review: ', error)
        })
    }
  })

  return (
    <div className='form-container'>
      <h1 className='header'>Shoe Box</h1>
      <form id='review-form' onSubmit={formik.handleSubmit}>
        <h3>Add New Review</h3>
        <div>
          <label htmlFor='content'>Content</label>
          <input
            id='content'
            name='content'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content ? (
            <div>{formik.errors.content}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor='rating'>Rating</label>
          <input
            id='rating'
            name='rating'
            type='number'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rating}
          />
          {formik.touched.rating && formik.errors.rating ? (
            <div>{formik.errors.rating}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor='shoe_id'>Shoe</label>
          <select
            id='shoe_id'
            name='shoe_id'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shoe_id}
          >
            <option value='' label='Select shoe' />
            {shoes.map(shoe => (
              <option key={shoe.id} value={shoe.id}>
                {shoe.brand} {shoe.model}
              </option>
            ))}
          </select>
          {formik.touched.shoe_id && formik.errors.shoe_id ? (
            <div>{formik.errors.shoe_id}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor='user_id'>User</label>
          <select
            id='user_id'
            name='user_id'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.user_id}
          >
            <option value='' label='Select user' />
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          {formik.touched.user_id && formik.errors.user_id ? (
            <div>{formik.errors.user_id}</div>
          ) : null}
        </div>
        <button type='submit'>Add Review</button>
      </form>
      <div className='review-container'>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

export default Reviews
