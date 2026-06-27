import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send httpOnly cookies with every request
});

// A bare client used only for token refresh to avoid interceptor loops
const refreshClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Send httpOnly cookies
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

let logoutHandler: (() => void) | null = null;

export function setLogoutHandler(fn: () => void) {
  logoutHandler = fn;
}

function processQueue(error: any) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      // Retry request; httpOnly cookies are automatically sent
      resolve(api.request(config));
    }
  });
  failedQueue = [];
}

// Browser automatically sends httpOnly cookies; no need to manually set Authorization header

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshClient.post('/auth/refresh');
        // Backend sets new httpOnly cookies; no need to extract token
        processQueue(null);
        return api.request(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        if (logoutHandler) logoutHandler();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
