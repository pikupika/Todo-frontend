
import axios from 'axios';

const BASE_URL = 'https://todo-backend-0ar5.onrender.com'; 

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
