import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Product } from '../features/cartSlice';

const CategoryList: React.FC = () => {
  const categories = useSelector((state: RootState) => state.category.categories);
  const items = useSelector((state: RootState) => state.cart.items);
  const categoryQuantities = useSelector((state: RootState) => state.cart.categoryQuantities);

  // Sorting products by category
  const groupedItems = Object.values(items).reduce((acc: Record<string, Product[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {categories.map((category) => {
          const categoryItems = groupedItems[category.name] || [];
          return (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {category.name} - {categoryQuantities[category.name] || 0}
                </Typography>
                <ul>
                  {categoryItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategoryList;
