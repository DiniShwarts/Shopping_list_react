
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/cartSlice';
import { Button, TextField, Stack, Box, FormControl, InputLabel, Select, MenuItem, Divider, Typography } from '@mui/material';
import { getCategories } from '../services/shoppingListService';
import { setCategories } from '../features/categorySlice';

const AddProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<number | ''>('');
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategoriesLocal] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategoriesLocal(categoriesData);
        dispatch(setCategories(categoriesData));
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoriesLocal([]);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const handleSubmit = () => {
    if (name && category !== '') {
      const newProduct = { name, category: category.toString(), quantity };
      dispatch(addProduct({ name, category: category.toString(), quantity }));

      // Storing the update in localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      cartItems.push(newProduct);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      setName('');
      setCategory('');
      setQuantity(1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: 2,
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1 }}
            variant="outlined"
            sx={{ width: '100px' }}
          />
          <FormControl variant="outlined" sx={{ width: 200 }}>
            <InputLabel id="category-label">קטגוריה</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value as number)}
              label="קטגוריה"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="שם מוצר"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            InputProps={{
              style: { textAlign: 'right' },
            }}
          />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          הוסף מוצר
        </Button>
        {/* קו רוחבי בצבע שחור */}
        <Box sx={{ width: '100%' }}>
          <Divider sx={{ width: '100%', borderColor: 'black' }} />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: '#FFA500', fontWeight: 'bold' }}
          >
            יש לאסוף מוצרים אלו במחלקות המתאימות
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default AddProduct;

