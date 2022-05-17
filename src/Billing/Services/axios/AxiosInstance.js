import axios from 'axios';
import qs from 'qs';

console.log('process.env.REACT_APP_BACKEND_BASE_UR', process.env.REACT_APP_BACKEND_BASE_URL);
export const DEFAULT_API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});
