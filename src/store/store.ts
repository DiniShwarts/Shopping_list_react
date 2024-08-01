
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { loadCartFromLocalStorage } from '../features/cartSlice';
import categoryReducer from '../features/categorySlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
  },
});

const cartData = localStorage.getItem('cart');
if (cartData) {
  store.dispatch(loadCartFromLocalStorage(JSON.parse(cartData)));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// store/index.ts
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer, { loadCartFromLocalStorage } from '../features/cartSlice';
// import categoryReducer, { loadCategoriesFromLocalStorage } from '../features/categorySlice';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     category: categoryReducer,
//   },
// });

// const cartData = localStorage.getItem('cart');
// if (cartData) {
//   store.dispatch(loadCartFromLocalStorage(JSON.parse(cartData)));
// }

// const categoryData = localStorage.getItem('categories');
// if (categoryData) {
//   store.dispatch(loadCategoriesFromLocalStorage(JSON.parse(categoryData)));
// }

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
