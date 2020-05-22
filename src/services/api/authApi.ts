import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://reqres.in/api',
});

export default authApi;
