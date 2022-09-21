import axios from 'axios';

const catalogClient = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_CATALOGAPI_BASE_URL}/`,
});

export { catalogClient };