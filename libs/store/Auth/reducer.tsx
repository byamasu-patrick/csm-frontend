import { createReducer } from '@reduxjs/toolkit';   
import { AuthError, ShopInfo, TokenModel, User } from '../../models/auth/AuthModels';
import { authError, authLoading, authSuccess, clearAuthError, logOut, logoutUser, registerCompleted, getShops, getShopsSuccess, getShopsFailed} from './actions';

export type AuthState = {
   user: User | any,
   tokenModel: TokenModel | null,
   isAuthenticated: boolean,
   isGettingShops: boolean,
   isLoading: boolean,
   error: AuthError | null,
   shops: ShopInfo[],
   errorMsg: string
   
};

const initialState: AuthState = {
   user: null,
   tokenModel: null,
   isAuthenticated: false,
   isGettingShops: false,
   isLoading: false,
   error: null,
   shops: [],
   errorMsg: ''
};

export const AuthReducer = createReducer(initialState, (builder) => {
   builder.addCase(authSuccess, (state, { payload }) => {
      return { ...state, error: null, isAuthenticated: true, isLoading: false, tokenModel: { accessToken: payload!.accessToken, refreshToken: payload!.refreshToken, validTo: payload!.validTo }, user: { email: payload!.email, emailConfirmed: payload!.emailConfirmed, profile: payload!.profile, userType: payload!.userType, id: payload!.id } }
   })

   builder.addCase(authError, (state, { payload }) => {
      // console.log("Error Response: ", payload)
      return { ...state, isLoading: false, error: payload }
   });

   builder.addCase(authLoading, (state, { payload }) => {
      return { ...state, isLoading: payload, error: null }
   });

   builder.addCase(registerCompleted, (state) => {
      return { ...state, isLoading: false, error: null }
   });

   builder.addCase(clearAuthError, (state) => {
      return { ...state, error: null, isLoading: false }
   });

   builder.addCase(logoutUser, (state, {payload}) => {
      return { ...state, error: null, isLoading: false, isAuthenticated: payload, tokenModel: null, user: null }
   });

   
   builder.addCase(getShops , (state, {payload}) =>{
      return {...state, isGettingShops : payload }
   });

   builder.addCase(getShopsSuccess , (state , {payload}) =>{
      return {
         ...state, 
         isGettingShops : false, 
         shops: payload
      }
   });

   builder.addCase(getShopsFailed , (state,{payload}) =>{
      return {
         ...state, 
         errorMsg : payload,
         isGettingShops : false, 
      }      
   });  
});