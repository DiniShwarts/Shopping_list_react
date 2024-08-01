




// Code development is still in progress...








import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setSearchTerm } from '../features/cartSlice';

const SearchProduct: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.cart.searchTerm);
  const products = useSelector((state: RootState) => state.cart.items);
  
  const filteredProducts = Object.values(products).filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(setSearchTerm(searchTerm));
  }, [searchTerm, dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search for a product" 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map(product => (
            <li key={`${product.category}-${product.name}`}
                style={{
                  backgroundColor: searchTerm && product.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 'yellow' : 'transparent'
                }}>
              {product.name} - {product.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchProduct;
