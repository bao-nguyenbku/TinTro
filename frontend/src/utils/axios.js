import axios from 'axios';
import { API_BASE_URL } from '@env';

axios.defaults.baseURL = 'http://10.229.88.197:5000' || API_BASE_URL;
export default axios;