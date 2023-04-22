import axios from 'axios';

const shippingClient = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_SHIPPINGAPI_BASE_URL}/`,
});

export { shippingClient };