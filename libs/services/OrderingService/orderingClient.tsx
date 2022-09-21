import axios from 'axios';

const orderingClient = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_ORDERINGAPI_BASE_URL}/`,
});

export { orderingClient };