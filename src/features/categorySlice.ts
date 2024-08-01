import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
// categorySlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Category {
//   id: number;
//   name: string;
// }

// interface CategoryState {
//   categories: Category[];
// }

// const initialState: CategoryState = {
//   categories: [
//     { id: 1, name: 'Electronics' },
//     { id: 2, name: 'Books' },
//     // הוסף קטגוריות נוספות לפי הצורך
//   ],
// };

// const categorySlice = createSlice({
//   name: 'category',
//   initialState,
//   reducers: {
//     // הוסף פעולות נדרשות
//   },
// });

// export default categorySlice.reducer;
