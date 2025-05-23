import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export async function apiRequest(endpoint, options = {}) {
  try {
    const { data } = await API.request({
      url: endpoint,
      ...options,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'API error');
  }
}

export default API;