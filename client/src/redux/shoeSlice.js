import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const fetchShoes = createAsyncThunk('shoes/fetchShoes', async () => {
  const response = await fetch('/shoes')
  return response.json()
})

export const addShoe = createAsyncThunk('shoes/addShoe', async (shoe) => {
  const response = await fetch('/shoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shoe)
  })
  return response.json()
})

export const updateShoe = createAsyncThunk('shoes/updateShoe', async ({ id, ...shoe }) => {
  const response = await fetch(`/shoes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shoe)
  })
  return response.json()
})

export const deleteShoe = createAsyncThunk('shoes/deleteShoe', async (id) => {
  await fetch(`/shoes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return id
})

const shoeSlice = createSlice({
  name: 'shoes',
  initialState: {
    shoes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoes.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchShoes.fulfilled, (state, action) => {
        state.loading = false
        state.shoes = action.payload
      })
      .addCase(fetchShoes.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addShoe.fulfilled, (state, action) => {
        state.shoes.push(action.payload)
      })
      .addCase(updateShoe.fulfilled, (state, action) => {
        const index = state.shoes.findIndex(shoe => shoe.id === action.payload.id)
        if (index !== -1) {
          state.shoes[index] = action.payload
        }
      })
      .addCase(deleteShoe.fulfilled, (state, action) => {
        state.shoes = state.shoes.filter(shoe => shoe.id !== action.payload)
      })
  },
})

const selectShoeState = (state) => state.shoes || { shoes: [] }

export const selectShoes = createSelector(
  [selectShoeState],
  (shoeState) => shoeState.shoes
)

export default shoeSlice.reducer
