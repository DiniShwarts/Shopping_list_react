import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice'; 
import categoryReducer from '../features/categorySlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
