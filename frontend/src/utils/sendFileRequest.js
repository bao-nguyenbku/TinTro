import axios from 'axios';
import { API_BASE_URL } from '@env';
import { getToken } from './token';

const request = axios.create({
  baseURL: API_BASE_URL || 'http://192.168.100.9:5000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 20000,
});
// Set token int header
request.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default request;
