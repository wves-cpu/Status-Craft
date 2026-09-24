import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const client = axios.create({ baseURL });

export async function createOrder(payload) {
  const { data } = await client.post('/orders', payload);
  return data;
}

export async function fetchOrders() {
  const { data } = await client.get('/orders');
  return data;
}

export async function updateOrderStatus(orderId, newStatus) {
  const { data } = await client.patch(`/orders/${orderId}/status`, { status: newStatus });
  return data;
}

export async function deleteOrder(orderId) {
  const { data } = await client.delete(`/orders/${orderId}`);
  return data;
}

export async function fetchTrackOrder(tokenOrPhone) {
  const { data } = await client.get(`/orders/track/${encodeURIComponent(tokenOrPhone)}`);
  return data;
}
