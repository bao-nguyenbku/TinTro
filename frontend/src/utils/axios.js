import axios from 'axios';
import { API_BASE_URL } from '@env';
import { getToken } from './token';

const request = axios.create({
  baseURL: API_BASE_URL || 'http://192.168.100.9:5000',
  headers: {
    Accept: '*/*',
    Connection: 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
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
