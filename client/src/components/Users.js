import React, { useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import UserCard from './UserCard';
import { UserContext } from './UserContext';

const Users = () => {
  const { users, setUsers, error, setError } = useContext(UserContext)


  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(user => setUsers(user))
      .catch(error => setError(error))
  
  }, [setError, setUsers])
  

  const validationSchema = yup.object({
    username: yup.string().required('Username is required')
  })

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(newUser => {
          setUsers([...users, newUser])
          resetForm()
        })
        .catch(error => setError(error))
    }
  })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const userCards = users.map((user) => {
    return <UserCard key={user.id} user={user} />
  })

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
        {userCards}
      </div>
    </div>
  )
}

export default Users
