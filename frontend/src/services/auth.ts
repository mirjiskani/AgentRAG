import api from "./api";
import axios from 'axios';
import type { RegisterData, LoginData } from "../types/auth";

export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const refreshToken = async () => {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';
  const client = axios.create({ baseURL: base, headers: { 'Content-Type': 'application/json' } });
  const response = await client.post('/auth/refresh');
  return response.data;
};
