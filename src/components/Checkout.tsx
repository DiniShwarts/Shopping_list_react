
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import Button from '@mui/material/Button';
import { clearCart } from '../features/cartSlice'; 
import { styled } from '@mui/material/styles';
import { addItems } from '../services/shoppingListService';

const CheckoutButton = styled(Button)(({ theme }) => ({
    position: 'fixed',
    bottom: '20px', 
    right: '20px',  
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    '&:hover': {
        backgroundColor: '#0056b3', 
    },
}));

const Checkout: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch: AppDispatch = useDispatch();

    const handleCheckout = async () => {
        const itemsArray = Object.values(items);

        if (itemsArray.length === 0) {
            console.error('לא נבחרו מוצרים להזמנה.');
            alert('לא נבחרו מוצרים להזמנה.');
            return;
        }

        const formattedItems = itemsArray.map(item => ({
            ...item,
            categoryId: parseInt(item.category, 10),
            category: undefined,
        }));

        try {
            await addItems(formattedItems);
            dispatch(clearCart());
            localStorage.removeItem('cartItems');
            console.log('ההזמנה נשלחה בהצלחה.');
        } catch (error) {
            console.error('שגיאה בשליחת ההזמנה:', error);
            alert('התרחשה שגיאה במהלך שליחת ההזמנה. אנא נסה שוב.');
        }
    };

    return (
        <CheckoutButton onClick={handleCheckout} variant="contained">
            סיום הזמנה
        </CheckoutButton>
    );
};

export default Checkout;
