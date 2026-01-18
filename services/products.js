import axios from 'axios';

export async function getProducts() {
  try {
    const response = await axios.get('http://72.62.244.144:5000/products');
  return response.data;
} catch (error) {
  console.error('Error fetching products:', error);
  throw error;
}
}