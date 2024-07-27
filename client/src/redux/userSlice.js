import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/users')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data
})

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data
})

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
  },
})

const selectUserState = (state) => state.users || { users: [] }

export const selectUsers = createSelector(
  [selectUserState],
  (userState) => userState.users
)

export const { removeUser } = userSlice.actions
export default userSlice.reducer
