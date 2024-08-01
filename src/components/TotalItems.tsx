
import { useSelector } from 'react-redux';
import { RootState } from '../store/index'; 
import Box from '@mui/material/Box';

const TotalItems: React.FC = () => {
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);

  return (
    <Box
      component="section"
      sx={{
        position: 'fixed',
        top: 90, 
        left: '20%', 
        transform: 'translateX(-50%)', 
        backgroundColor: '#fff', 
        padding: 2, 
        borderRadius: 1, 
        fontSize: '1.25rem', 
        fontWeight: 'bold', 
        border: '1px dashed #03a9f4', 
        boxShadow: 1, 
      }}
    >
      סה"כ: {totalItems} מוצרים
    </Box>
  );
};

export default TotalItems;
