import { createReducer } from '@reduxjs/toolkit';   
import { AuthError, TokenModel, User } from '../../models/auth/AuthModels';
import { authError, authLoading, authSuccess, clearAuthError, logOut, registerCompleted } from './actions';

export type AuthState = {
   user: User | null,
   tokenModel: TokenModel | null,
   isAuthenticated: boolean,
   isLoading: boolean,
   error: AuthError | null,
};

const initialState: AuthState = {
   user: null,
   tokenModel: null,
   isAuthenticated: false,
   isLoading: false,
   error: null,
};

export const AuthReducer = createReducer(initialState, (builder) => {
   builder.addCase(authSuccess, (state, { payload }) => {
      return { ...state, error: null, isAuthenticated: true, isLoading: false, tokenModel: { accessToken: payload!.accessToken, refreshToken: payload!.refreshToken, validTo: payload!.validTo }, user: { email: payload!.email, emailConfirmed: payload!.emailConfirmed, profile: payload!.profile, userType: payload!.userType } }
   })

   builder.addCase(authError, (state, { payload }) => {
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

   builder.addCase(logOut, (state) => {
      return { ...state, error: null, isLoading: false, isAuthenticated: false, tokenModel: null, user: null }
   });
});