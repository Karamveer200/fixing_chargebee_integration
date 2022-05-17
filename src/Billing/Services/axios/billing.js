import { DEFAULT_API as axios } from './AxiosInstance';
console.log('axios', axios);
export const getBillingPaymentIntent = async () => {
  return axios.get('/billing/details/payment/generate').then((res) => res?.data);
};
