import { DEFAULT_API as axios } from './AxiosInstance';

export const getBillingPaymentIntent = async () => {
  return axios
    .get('/billing/details/payment/generate', {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
    .then((res) => res?.data);
};
