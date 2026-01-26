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
    const r = await axios.get(`${process.env.BACKEND_API_URL}/subscriptions?sku_id=${skuId}`);
    return r.data;
} catch (error) {
  console.error('Error fetching products:', error);
  throw error;
}
}

export async function getItem(productId) {
  try{
    const r = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${productId}`);
    return r.data;
} catch (error) {
  console.error('Error fetching product:', error);
  throw error;
}
}

