import axios from 'axios';
import qs from 'qs';

export const DEFAULT_API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});
