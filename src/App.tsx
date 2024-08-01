// import React from 'react';
// import './App.css';
// import TotalItems from './components/TotalItems'; // רכיב להצגת סך כל הפריטים
// import AddProduct from './components/AddProduct'; // רכיב להוספת מוצר
// import ProductList from './components/ProductList'; // רכיב להצגת רשימת מוצרים
// import Checkout from './components/Checkout'; // רכיב לביצוע תשלום
// import AppBar from './components/AppBar'

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <AppBar/>
//       <main>
//         <TotalItems />
//         <AddProduct />
//         <ProductList />
//         <Checkout />
//       </main>
//     </div>
//   );
// }

// export default App;
import React, { useEffect } from 'react';
import './App.css';
import TotalItems from './components/TotalItems'; // רכיב להצגת סך כל הפריטים
import AddProduct from './components/AddProduct'; // רכיב להוספת מוצר
import ProductList from './components/ProductList'; // רכיב להצגת רשימת מוצרים
import Checkout from './components/Checkout'; // רכיב לביצוע תשלום
import AppBar from './components/AppBar';
import { useDispatch } from 'react-redux';
import { addProduct } from './features/cartSlice';
import { Product } from './features/cartSlice'; // ייבוא סוג המוצר

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedItems: Product[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (savedItems.length > 0) {
      savedItems.forEach((item: Product) => { // ציון הסוג של item
        dispatch(addProduct(item));
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar />
      <main>
        <TotalItems />
        <AddProduct />
        <ProductList />
        <Checkout />
      </main>
    </div>
  );
}

export default App;
