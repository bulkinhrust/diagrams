import authStore from '@stores/auth/authStore';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  let accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Если ошибка 401 и это НЕ повторный запрос, пробуем обновить токен
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await authStore.refreshToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return await api(originalRequest);
        }
      } catch (refreshError) {
        if ((refreshError as AxiosError).response?.status === 401) {
          await authStore.logout();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

const http = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await api.get<T>(url, config);

    return data;
  },

  async post<T, D>(url: string, body: D, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await api.post<T>(url, body, config);

    return data;
  },

  async patch<T, D>(url: string, body: D, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await api.patch<T>(url, body, config);

    return data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await api.delete<T>(url, config);

    return data;
  },
};

export default http;
