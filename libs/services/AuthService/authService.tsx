import axios, { AxiosError } from "axios";
import { ApiResponse, AuthError, AuthProviderEnum, DecodedToken, FacebookTokenResponse, RegisterParamModel, TokenModel, User } from "../../models/auth/AuthModels";
import { authClient, facebookTokenClient, tokenClient } from "./authClients";
import jwt_decode from 'jwt-decode';

const registerWithEmailAndPassword = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    accountType: string
 ): Promise<AuthError | void> => {
    var data: RegisterParamModel = {
       email,
       password,
       firstName,
       lastName,
       accountType
    };
 
    try {
       await authClient.post<ApiResponse>('Register', data);
       await authClient.post<ApiResponse>('SendActivationEmail', { email });
    } catch (error) {
       const err = (error as AxiosError<ApiResponse>).response!.data;
       return {
          code: err.code,
          message: err.message!
       };
    }
 };

 const registerAsFacebookUser = async (idToken: string): Promise<User & TokenModel> => {
    const response = await authClient.post<ApiResponse<TokenModel>>(
       'RegisterFacebook',
       null,
       {
          headers: {
             Authorization: `Bearer ${idToken}`,
          },
       }
    );
 
    const content = response.data;
    const decodedToken = decodeJwtToken(content.data?.accessToken!);
 
    const result: User & TokenModel = {
      id: Number(decodedToken.sub),
      email: decodedToken.email,
      profile: {
         firstName: decodedToken.name,
         lastName: decodedToken.family_name,
      },
      userType: decodedToken.role,
      emailConfirmed: decodedToken.email_confirmed == "true",
      accessToken: content.data?.accessToken!,
      refreshToken: content.data?.refreshToken!,
      validTo: content.data?.validTo!
    };
    return result;
 };
 
const exchangeFacebookCode = async (
    code: string
 ): Promise<FacebookTokenResponse> => {
    const facebookTokenResponse =
       await facebookTokenClient.get<FacebookTokenResponse>(
          `access_token?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL}/facebook&code_verifier=${sessionStorage.getItem(`${AuthProviderEnum.Facebook.toString()}-code_verifier`)}&code=${code}`
       );
    return facebookTokenResponse.data;
 };
 
const activateUser = async (token: string, email: string): Promise<{ userTokenModel: User & TokenModel | null; error: AuthError | null }> => {
    try {
       const response = await authClient.post<ApiResponse<TokenModel>>(
          'ActivateAccount',
          { token: token, email: email }
       );
       const content = response.data;
       const decodedToken = decodeJwtToken(content.data?.accessToken!);
       console.log(decodedToken);
       const user: User & TokenModel = {
         id: Number(decodedToken.sub),
          email: decodedToken.email,
          profile: {
             firstName: decodedToken.name,
             lastName: decodedToken.family_name,
          },
          userType: decodedToken.role,
          emailConfirmed: decodedToken.email_confirmed == "true",
          accessToken: content.data?.accessToken!,
          refreshToken: content.data?.refreshToken!,
          validTo: content.data?.validTo!
       };
       return {
          userTokenModel: user,
          error: null,
       };
    } catch (error) {
       const errData = (error as AxiosError<ApiResponse>).response!.data
       return {
          userTokenModel: null,
          error: {
             code: errData.code,
             message: errData.message!
          }
       };
    }
 }

 const initialLoadUser = async (): Promise<User & TokenModel | null> => {
    const token = localStorage.getItem('token');
    if (token) {
       let tokenModel = JSON.parse(token) as TokenModel;
       let decodedToken = decodeJwtToken(tokenModel.accessToken);
 
       if (decodedToken) {
          const currentTime = getUtcNowSecondsSinceEpoch();
          const tokenExpiryTime = decodedToken.exp;
          
          if (currentTime > tokenExpiryTime) {
             try {
                tokenModel = await refreshAccessToken(tokenModel);
                decodedToken = decodeJwtToken(tokenModel.accessToken);
                setLocalStorage(tokenModel);
             } catch {
                clearLocalStorage();
                return null;
             }
          }
       }
 
       const user: User & TokenModel = {
         id: Number(decodedToken.sub),
          email: decodedToken.email,
          profile: {
             firstName: decodedToken.name,
             lastName: decodedToken.family_name,
          },
          userType: decodedToken.role,
          emailConfirmed: decodedToken.email_confirmed == "true",
          accessToken: tokenModel.accessToken,
          refreshToken: tokenModel.refreshToken,
          validTo: tokenModel.validTo
       };
 
       return user;
    }
 
    return null;
 };
 
const resetPasswordEmail = async (email: string): Promise<void> => {
    await authClient.post<ApiResponse>("SendResetPasswordEmail", {email})
 };
 
 const resetPassword = async (password: string, token: string): Promise<AuthError | void> => {
    try {
       await authClient.post<ApiResponse>("ResetPassword", { password, token });
    } catch (error) {
       const errResp = (error as AxiosError<ApiResponse>).response!.data;
       return {
          code: errResp.code,
          message: errResp.message!
       }
    }
 };
 
const setLocalStorage = (tokenModel: TokenModel) => {
    const tokenJson = JSON.stringify(tokenModel);
    localStorage.setItem('token', tokenJson);
 };
 
 const clearLocalStorage = () => {
    localStorage.removeItem('token');
 }; 

 const signInWithFacebook = (): void => {
    const code_verifier = generateCodeVerifier(AuthProviderEnum.Facebook);
 
    const facebookAuthUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&code_challenge=${code_verifier}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL}/facebook&reponse_type=code&scope=openid,public_profile,email`;
 
    window.location.href = facebookAuthUrl;
};

const getUtcNowSecondsSinceEpoch = () => {
    const utcMilllisecondsSinceEpoch = Date.now();
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
    return utcSecondsSinceEpoch;
 };
 

const refreshAccessToken = async (
    tokenModel: TokenModel
 ): Promise<TokenModel> => {
    try {
       const response = await tokenClient.post<ApiResponse<TokenModel>>(
          'refresh',
          {
             accessToken: tokenModel.accessToken,
             refreshToken: tokenModel.refreshToken,
          }
       );
 
       return response.data.data!;
    } catch (error) {
       throw Error();
    }
 };

const generateCodeVerifier = (authProvider: AuthProviderEnum) => {
    sessionStorage.removeItem(`${authProvider.toString()}-code_verifier`);
 
    function dec2hex(dec: any) {
       return ("0" + dec.toString(16)).substring(-2);
    }
 
    var array = new Uint32Array(18 / 2);
    window.crypto.getRandomValues(array);
    const code_verifier = Array.from(array, dec2hex).join("");
 
    sessionStorage.setItem(`${authProvider.toString()}-code_verifier`, code_verifier);
 
    return code_verifier;
 }
 
export const decodeJwtToken = (token: string) => {
    const decoded = jwt_decode<DecodedToken>(token);
    return decoded;
 };

 export const GetShopService = async (isShops: boolean) => {
   try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/GetShops/${isShops}`);

      return response.data;
   }
   catch(error){

   }

 }
 
export {
    signInWithFacebook,
    registerAsFacebookUser,
    registerWithEmailAndPassword,
    exchangeFacebookCode,
    initialLoadUser,
    clearLocalStorage,
    setLocalStorage,
    activateUser,
    resetPasswordEmail,
    resetPassword
 };