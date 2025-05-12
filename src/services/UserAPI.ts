import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const UserAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    accept: 'application/json',
    Authorization: ` ${API_TOKEN}`,
  },
});
