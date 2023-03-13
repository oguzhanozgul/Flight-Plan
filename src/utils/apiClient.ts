import { apiUrl } from "./apiUrl";
import axios from "axios";

const apiClient = axios.create({
  baseURL: apiUrl(),
});

export default apiClient;
