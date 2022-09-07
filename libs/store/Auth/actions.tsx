import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ApiResponse, AuthError, LoginParamModel, TokenModel, User } from '../../models/auth/AuthModels';
import { authClient } from '../../services/AuthService/authClients';
import { activateUser, decodeJwtToken, initialLoadUser, registerAsFacebookUser, resetPassword, resetPasswordEmail, registerWithEmailAndPassword as register } from '../../services/AuthService/authService';
import { ActionType } from './actions-type';

const setLocalTokenStorage = (tokenModel: TokenModel) => {
    const tokenJson = JSON.stringify(tokenModel);
    localStorage.setItem('token', tokenJson);
 };
 
 const clearLocalTokenStorage = () => {
    localStorage.removeItem('token');
 };

 interface ActivateParam{
    email: string;
    token: string;
 }

export const authLoading = createAction<boolean>(ActionType.AUTH_LOADING);
export const authError = createAction<AuthError>(ActionType.AUTH_ERROR);
export const clearAuthError = createAction<void>(ActionType.CLEAR_AUTH_ERROR);
export const authSuccess = createAction<User & TokenModel>(ActionType.AUTH_SUCCESS);
export const registerCompleted = createAction<void>(ActionType.REGISTER_COMPLETED);

export const signInWithEmailAndPassword = createAsyncThunk<void, { email: string; password: string }>(
    ActionType.SIGN_IN_WITH_EMAIL_AND_PASSWORD,
    async (
       { email, password },
       thunkApi,
    ) => {
       thunkApi.dispatch(authLoading(true));
 
       const data: LoginParamModel = {
          email: email,
          password: password,
       };
 
       try {
          const response = await authClient.post<ApiResponse<TokenModel>>(
             'login',
             data
          );
          const content = response.data;
          const decodedToken = decodeJwtToken(content.data?.accessToken!);
          
          const userModel: User & TokenModel = {
            id: Number(decodedToken.sub),
            accessToken: content.data?.accessToken!,
            refreshToken: content.data?.refreshToken!,
            validTo: content.data?.validTo!,
            email: decodedToken.email,
            emailConfirmed: decodedToken.email_confirmed === "true",
            userType: decodedToken.role,
            profile: {
               firstName: decodedToken.name,
               lastName: decodedToken.family_name
            }
          };
 
          setLocalTokenStorage(content.data!);
          thunkApi.dispatch(authSuccess(userModel));
       } catch (error) {
          const err = (error as AxiosError<ApiResponse<TokenModel>>).response!.data
          thunkApi.dispatch(authError({ message: err.message!, code: err.code }))
       }
    }
 );
 
 
 export const registerOrLogInAsFacebookUser = createAsyncThunk<void, string>(
    ActionType.REGISTER_OR_LOGIN_AS_FACEBOOK_USER,
    async (
       idtoken,
       thunkApi,
    ) => {
       thunkApi.dispatch(authLoading(true));
       const response = await registerAsFacebookUser(idtoken);
       setLocalTokenStorage({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          validTo: response.validTo
       });
       thunkApi.dispatch(authSuccess(response));
    }
 );
 

 
export const registerWithEmailAndPassword = createAsyncThunk<void, {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    accountType: string
 }>(
    ActionType.REGISTER_WITH_EMAIL_AND_PASSWORD,
    async (
       credentials,
       thunkApi,
    ) => {
       const { email, firstName, lastName, password, accountType } = credentials;
       thunkApi.dispatch(authLoading(true));
       const registerErrResult = await register(email, password, firstName, lastName, accountType);
        console.log(registerErrResult);
       if (registerErrResult) {
          thunkApi.dispatch(authError({
            code: 500, 
            message: "Error while creating an account"
          }));
          return thunkApi.rejectWithValue(null);
       }
 
       thunkApi.dispatch(registerCompleted());
    }
 );
 
 export const activate = createAsyncThunk<void, ActivateParam>(
    ActionType.ACTIVATE_ACCOUNT,
    async (
       data,
       thunkApi,
    ) => {
       thunkApi.dispatch(authLoading(true));
       const activationResult = await activateUser(data.token, data.email);
 
       if (activationResult.error) {
          thunkApi.dispatch(authError(activationResult.error));
          return thunkApi.rejectWithValue(null);
       }
       setLocalTokenStorage(activationResult.userTokenModel!);
       thunkApi.dispatch(authSuccess(activationResult.userTokenModel!));
    }
 );
 
 export const logOut = createAction(ActionType.LOGOUT, () => {
    clearLocalTokenStorage();    

    return {
       payload: null
    }
 });

 
export const initialLoad = createAsyncThunk<void, void>(
    ActionType.INITIAL_LOAD,
    async (
       _,
       thunkApi,
    ) => {
       thunkApi.dispatch(authLoading(true));
 
       const authModel = await initialLoadUser();
       authModel && thunkApi.dispatch(authSuccess(authModel));
       !authModel && thunkApi.dispatch(clearAuthError());
    }
 );
 
 export const sendResetPasswordEmail = createAsyncThunk<void, string>(
    ActionType.SEND_RESET_PASSWORD_EMAIL,
    async (
       email,
       thunkApi,
    ) => {
       thunkApi.dispatch(authLoading(true));
       await resetPasswordEmail(email);
       thunkApi.dispatch(authLoading(false));
    }
 );
 
 export const resetPasswordAction = createAsyncThunk<void, { password: string, token: string }>(
    ActionType.RESET_PASSWORD,
    async (
       resetPassModel,
       thunkApi,
    ) => {
       thunkApi.dispatch(authLoading(true));
       const result = await resetPassword(resetPassModel.password, resetPassModel.token);
       if (result) {
          thunkApi.dispatch(authError(result))
          return thunkApi.rejectWithValue(null);
       }
       thunkApi.dispatch(authLoading(false));
    }
 );
 
 