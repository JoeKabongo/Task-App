import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:5000/api/`,
  withCredentials: true,
  // 'Access-Control-Allow-Credentials': true,
});

export default instance;
