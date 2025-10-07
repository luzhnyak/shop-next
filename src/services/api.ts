import axios, { AxiosResponse } from "axios";
import { store } from "@/redux/store";
import { resetAuthData } from "@/redux/auth/authSlice";
import { HealthCheckTypes } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(resetAuthData());
    }
    return Promise.reject(error);
  }
);

export default api;

export const getHealthCheck = async (): Promise<
  AxiosResponse<HealthCheckTypes>
> => {
  return await api.get("/healthcheck");
};
