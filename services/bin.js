import axios from 'axios';

export async function getSubscriptionsSku() {
  
  try{
    const r = await axios.get(`${process.env.BACKEND_API_URL}/products`);
    return r.data;
} catch (error) {
  console.error('Error fetching products:', error);
  throw error;
}
}
