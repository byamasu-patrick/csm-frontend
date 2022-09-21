import axios from 'axios';

const basketClient = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_BASKETAPI_BASE_URL}/`,
});

export { basketClient };