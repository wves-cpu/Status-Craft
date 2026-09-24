import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const client = axios.create({ baseURL });

// Add JWT auth token to requests if available
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('statuscraft_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function createOrder(payload) {
  const { data } = await client.post('/orders', payload);
  return data;
}

export async function fetchOrders() {
  const { data } = await client.get('/orders');
  return data;
}

export async function updateOrderStatus(orderId, newStatus, statusNote = '') {
  const { data } = await client.patch(`/orders/${orderId}/status`, {
    status: newStatus,
    statusNote,
  });
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

export async function fetchWorkshops() {
  const { data } = await client.get('/auth/workshops');
  return data;
}

export async function updateMasterProfile(profileData) {
  const { data } = await client.put('/auth/profile', profileData);
  return data;
}
