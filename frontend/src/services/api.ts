import axios from 'axios';

let _token: string | null = null;

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = _token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      _token = null;
    }
    return Promise.reject(error);
  }
);

export default api;
