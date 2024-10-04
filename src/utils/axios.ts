import { clearAuthCache, getToken } from '@/utils/auth';
import { message } from 'antd';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

const service = axios.create({
  baseURL: '/api',
  timeout: 10 * 1000,
});

const handleError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401 || error.response?.status === 504) {
    clearAuthCache();
    location.href = '/login';
  }
  message.error(error.message || 'error');
  return Promise.reject(error);
};

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    (config as Recordable).headers['Authorization'] = `${token}`;
  }
  (config as Recordable).headers['Content-Type'] = 'application/json';
  return config;
}, handleError);

service.interceptors.response.use((response: AxiosResponse) => {
  const data = response.data;

  if (data.code === 0) {
    return data.data;
  } else {
    message.error(data.message);

    return Promise.reject('error');
  }
}, handleError);

export { service };
