import axios from 'axios';

const request = axios.create({
    baseUrl: process.env.API_BASE_URL,
});

export default request;