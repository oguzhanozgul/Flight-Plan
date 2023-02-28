import axios from 'axios';

const apiUrlDev = import.meta.env.VITE_API_URL_DEV;
const apiUrlProd = import.meta.env.VITE_API_URL_PROD;

const apiClient = axios.create({
  baseURL: apiUrlDev,
});

export default apiClient;
