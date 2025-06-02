import { envConfig } from '@/envConfig';
import axios from 'axios';

const instance = axios.create({ baseURL: envConfig.API_URL, });

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);


export default instance;
