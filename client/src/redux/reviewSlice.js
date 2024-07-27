import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from './userSlice';

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await fetch('/reviews')
  return response.json()
})

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (review, { dispatch }) => {
    const response = await fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
    const data = await response.json()
    dispatch(fetchUsers())
    return data
  }
)

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false
        state.reviews = action.payload
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload)
      })
  },
})

export const selectReviews = (state) => state.reviews.reviews

export default reviewSlice.reducer
