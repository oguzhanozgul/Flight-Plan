import axios from 'axios';
import { apiUrl } from './apiUrl';



const apiClient = axios.create({
  baseURL: apiUrl(),
});

export default apiClient;
