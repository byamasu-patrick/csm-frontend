import axios from 'axios';

const authClient = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/`,
});

const tokenClient = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/token/`,
});

const facebookTokenClient = axios.create({
   baseURL: `https://graph.facebook.com/v14.0/oauth/`,
});

const googleTokenClient = axios.create({
   baseURL: `https://api.amazon.com/auth/o2/`,
});



export { authClient, tokenClient, facebookTokenClient, googleTokenClient };
