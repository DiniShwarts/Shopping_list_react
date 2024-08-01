import axios from 'axios';

axios.defaults.baseURL = "https://localhost:7199/"

interface Category {
    id: number;
    name: string;
  }
  
  // Function to get categories
  const getCategories = async (): Promise<Category[]> => {
    try {
      const response = await axios.get('api/getCategories');
      return response.data; 
    } catch (error) {
      console.error('Error fetching categories:', error);
      return []; 
    }
  };
 // Function to add items
const addItems = async (items: any[]): Promise<void> => {

    if (items.length === 0) {
      console.error('אין פריטים להזמנה.');
      return;
    }
  
    try {
        
      const response = await axios.post('/api/addItems', items, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);

      if (response.status === 200|| response.status === 201) {
        alert('ההזמנה נשמרה בהצלחה');
    } else {
        console.error('שגיאה בשמירת ההזמנה');
      }
    } catch (error) {
      console.error('שגיאה בשמירת ההזמנה:', error);
    }
  };
  export { getCategories, addItems}
