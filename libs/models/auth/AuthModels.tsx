import { ErrorEnum } from "../error-enums";

export enum AuthProviderEnum {
    EmailAndPassword,
    Facebook,
    Google,
    Twitter
 }
 
 export enum UserType {
    Anonymous = 'Anonymous',
    Admin = "Admin",
    ShopOwner = "Shop-Owner",
    FreeUser = "Free-User",
    PremiumUser = "Premium-User",
 }

 export interface AuthError {
    code: ErrorEnum,
    message: string
 }

 export interface ShopInfo{
   id: number,
   firstName: string,
   lastName: string,
   email: string
 }
 
 export interface User {
    // tokenModel: TokenModel;
    id: number;
    email: string;
    emailConfirmed: boolean;
    userType: UserType;
    profile: Profile | null;
 }
 
 interface Profile {
    firstName: string;
    lastName: string;
 }
 
 export interface ApiResponse<T = void> {
    isSuccess: boolean;
    message: string | null;
    code: ErrorEnum
    data?: T;
 }
 
 export interface TokenModel {
    accessToken: string;
    refreshToken: string;
    validTo: Date;
 }
 
 export interface FacebookTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: string;
    id_token: string;
 }
 
 export interface AmazonTokenResponse {
    access_token: string;
 }
 
 export interface TokenRefreshModel {
    accessToken: string;
    refreshToken: string;
 }
 
 export interface DecodedToken {
    sub: string;
    jti: string;
    email: string;
    name: string;
    family_name: string;
    email_confirmed: string;
    role: UserType;
    exp: number;
 }
 
 export interface LoginParamModel {
    email: string;
    password: string;
 }
 
 export interface RegisterParamModel {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    accountType: string;
 }