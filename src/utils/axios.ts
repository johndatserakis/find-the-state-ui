import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1/`,
});

export { axiosInstance as axios };
