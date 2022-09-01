import { EnhancedStore } from "@reduxjs/toolkit"
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { ApiResponse, TokenModel } from "./models/auth/AuthModels";
import { tokenClient } from "./services/AuthService/authClients";
import { clearLocalStorage, setLocalStorage } from "./services/AuthService/authService";
import { AppDispatch } from "./store";
import { logOut } from "./store/Auth/actions";
let store: EnhancedStore

export const configureApp = (_store: EnhancedStore) => {
   store = _store
}

declare module 'axios' {
   export interface Axios {
      createWithAuth(config?: AxiosRequestConfig): AxiosInstance;
   }
}

axios.prototype.constructor.createWithAuth = (config?: AxiosRequestConfig): AxiosInstance => {
   const axiosInstance = axios.create(config);

   // request interceptor
   axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig<any>) => {
         const token = localStorage.getItem('token');
         if (token) {
            const tokenModel = JSON.parse(token) as TokenModel;
            config.headers = {
               ...config.headers,
               Authorization: `Bearer ${tokenModel.accessToken}`,
            };
         } else {
            (store.dispatch as AppDispatch)(logOut());
            return;
         }
         return config;
      }
   );

   //response interceptor
   axiosInstance.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
         if (error.response?.status !== 401) {
            return Promise.reject(error);
         }
         const token = localStorage.getItem('token');
         if (token) {
            const tokenModel = JSON.parse(token) as TokenModel;
            try {
               const response = await tokenClient.post<ApiResponse<TokenModel>>(
                  'refresh',
                  {
                     accessToken: tokenModel.accessToken,
                     refreshToken: tokenModel.refreshToken,
                  }
               );

               setLocalStorage(response.data.data!);
               const originalRequestConfig = error.config;
               delete originalRequestConfig.headers!['Authorization'];
               return axiosInstance.request(originalRequestConfig);
            } catch (error) {
               (store.dispatch as AppDispatch)(logOut());
               return Promise.reject(error);
            }
         } else {
            clearLocalStorage();
            (store.dispatch as AppDispatch)(logOut());
            return Promise.reject(error);
         }
      }
   )

   return axiosInstance;
}
