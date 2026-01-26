import axios from 'axios';

export async function getSubscriptionsSku() {
  
  try{
    const r = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`);
    return r.data;
} catch (error) {
  console.error('Error fetching products:', error);
  throw error;
}
}

export async function getItems(skuId) {
  
  try{
    const r = await axios.get(`${process.env.BACKEND_API_URL}/subscriptions?sku=${skuId}`);
    return r.data;
} catch (error) {
  console.error('Error fetching products:', error);
  throw error;
}
}

