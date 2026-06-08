import api from "./api";
import type { RegisterData, LoginData } from "../types/auth";

export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
export const refreshToken =
  async () => {
    const response =
      await api.post(
        "/auth/refresh"
      );

    return response.data;
  };
