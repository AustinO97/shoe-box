import { configureStore } from '@reduxjs/toolkit';
import shoeReducer from './shoeSlice';
import reviewReducer from './reviewSlice';
import categoryReducer from './categorySlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    shoes: shoeReducer,
    reviews: reviewReducer,
    categories: categoryReducer,
    users: userReducer,
  },
})

export default store
