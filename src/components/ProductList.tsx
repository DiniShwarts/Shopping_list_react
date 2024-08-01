import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { Product } from '../features/cartSlice';
import { Box, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

const ProductList: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const categoryQuantities = useSelector((state: RootState) => state.cart.categoryQuantities);
  const categories = useSelector((state: RootState) => state.category.categories);

  // Sorting products by category
  const groupedItems = Object.values(items).reduce((acc: Record<string, Product[]>, item) => {
    const product = item as Product;
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {Object.keys(groupedItems).map((categoryId) => {
          const category = categories.find(cat => cat.id === parseInt(categoryId));

          return (
            <Grid item xs={12} sm={4} md={4} key={categoryId}> 
              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    position: 'relative',
                    paddingBottom: 1,
                    textAlign: 'center', 
                    '&::after': {
                      content: '""',
                      display: 'block',
                      width: '50%', 
                      height: '2px', 
                      backgroundColor: '#007bff', 
                      position: 'absolute',
                      bottom: 0,
                      left: '25%', 
                    },
                  }}
                >
                  מחלקת {category ? category.name : 'Unknown Category'} - {categoryQuantities[parseInt(categoryId, 10)] || 0} מוצרים
                </Typography>
                <Box sx={{ textAlign: 'center' }}> 
                  <List sx={{ display: 'inline-block' }}>
                    {groupedItems[categoryId].map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" >
                                {item.quantity} - {item.name}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductList;
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store/index';
// import { Product } from '../features/cartSlice';
// import { Box, Typography, List, ListItem, ListItemText, Grid, IconButton } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import { incrementQuantity, decrementQuantity } from '../features/cartSlice';

// const ProductList: React.FC = () => {
//   const dispatch = useDispatch();
//   const items = useSelector((state: RootState) => state.cart.items);
//   const categoryQuantities = useSelector((state: RootState) => state.cart.categoryQuantities);
//   const categories = useSelector((state: RootState) => state.category.categories);

//   // מיון המוצרים לפי קטגוריה
//   const groupedItems = Object.values(items).reduce((acc: Record<string, Product[]>, item) => {
//     const product = item as Product;
//     if (!acc[product.category]) {
//       acc[product.category] = [];
//     }
//     acc[product.category].push(product);
//     return acc;
//   }, {} as Record<string, Product[]>);

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Grid container spacing={2}>
//         {Object.keys(groupedItems).map((categoryId) => {
//           const category = categories.find(cat => cat.id === parseInt(categoryId));

//           return (
//             <Grid item xs={12} sm={4} md={4} key={categoryId}>
//               <Box sx={{ marginBottom: 2 }}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 'bold',
//                     position: 'relative',
//                     paddingBottom: 1,
//                     textAlign: 'center',
//                     '&::after': {
//                       content: '""',
//                       display: 'block',
//                       width: '50%',
//                       height: '2px',
//                       backgroundColor: '#007bff',
//                       position: 'absolute',
//                       bottom: 0,
//                       left: '25%',
//                     },
//                   }}
//                 >
//                   מחלקת {category ? category.name : 'Unknown Category'} - {categoryQuantities[parseInt(categoryId, 10)] || 0} מוצרים
//                 </Typography>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <List sx={{ display: 'inline-block' }}>
//                     {groupedItems[categoryId].map((item) => (
//                       <ListItem key={item.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
//                         <ListItemText
//                           primary={
//                             <Typography variant="body2" sx={{ marginRight: 2 }}>
//                               {item.name}
//                             </Typography>
//                           }
//                         />
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <IconButton onClick={() => dispatch(decrementQuantity(`${item.category}-${item.name}`))}>
//                             <RemoveCircleOutlineIcon />
//                           </IconButton>
//                           <Typography variant="body2" sx={{ marginX: 1 }}>
//                             {item.quantity}
//                           </Typography>
//                           <IconButton onClick={() => dispatch(incrementQuantity(`${item.category}-${item.name}`))}>
//                             <AddCircleIcon />
//                           </IconButton>
//                         </Box>
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Box>
//               </Box>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default ProductList;

