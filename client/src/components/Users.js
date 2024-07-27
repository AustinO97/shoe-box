// src/components/Users.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { fetchUsers, addUser, selectUsers } from '../redux/userSlice';
import UserCard from './UserCard';

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const userStatus = useSelector(state => state.users.status)
  const error = useSelector(state => state.users.error)

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [userStatus, dispatch])

  const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addUser(values)).then(() => {
        resetForm()
      })
    },
  })

  if (userStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (userStatus === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div className='form-container'>
      <h1 className='header'>Shoe Box</h1>
      <form id='shoe-form' onSubmit={formik.handleSubmit}>
        <h3>Add New User</h3>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            name='username'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>
        <button type='submit'>Add User</button>
      </form>
      <div>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Users
