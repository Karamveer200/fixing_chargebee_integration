import { DEFAULT_API as axios } from './AxiosInstance';

export const getBillingPaymentIntent = async () => {
  return axios.get('/billing/details/payment/generate').then((res) => res?.data);
};
