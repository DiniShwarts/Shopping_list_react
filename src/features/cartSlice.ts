
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  name: string;
  category: string;
  quantity: number;
}

interface CartState {
  items: Record<string, Product>;
  searchTerm: string; // Adding search state is still in development
  totalItems: number;
  categoryQuantities: Record<string, number>;
}

const initialState: CartState = {
  items: {},
  totalItems: 0,
  categoryQuantities: {},
  searchTerm: '', // Default value for search is still in development
};

// Function to save data to Local Storage
const saveCartToLocalStorage = (cart: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const { name, category, quantity } = action.payload;
      const key = `${category}-${name}`;

      if (state.items[key]) {
        state.items[key].quantity += quantity;
      } else {
        state.items[key] = { name, category, quantity };
      }

      if (state.categoryQuantities[category]) {
        state.categoryQuantities[category] += quantity;
      } else {
        state.categoryQuantities[category] = quantity;
      }

      state.totalItems = Object.values(state.items).reduce((total, item) => total + item.quantity, 0);

      // Saving to Local Storage
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.categoryQuantities = {};

      // Deleting from Local Storage
      localStorage.removeItem('cart');
    },
    loadCartFromLocalStorage: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.items[key]) {
        state.items[key].quantity += 1;
        state.totalItems += 1;
        state.categoryQuantities[state.items[key].category] += 1;

        // Saving to Local Storage
        saveCartToLocalStorage(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.items[key] && state.items[key].quantity > 0) {
        state.items[key].quantity -= 1;
        state.totalItems -= 1;
        state.categoryQuantities[state.items[key].category] -= 1;

        if (state.items[key].quantity === 0) {
          delete state.items[key];
        }

        // Saving to Local Storage
        saveCartToLocalStorage(state);
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addProduct, clearCart, loadCartFromLocalStorage, incrementQuantity, decrementQuantity, setSearchTerm } = cartSlice.actions;
export default cartSlice.reducer;
