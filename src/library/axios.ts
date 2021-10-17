import axios from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export { axiosInstance as axios };
