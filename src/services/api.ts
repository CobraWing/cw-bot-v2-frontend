import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);

export default api;
