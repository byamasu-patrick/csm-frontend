import { createReducer } from '@reduxjs/toolkit';   
import { BillingAddressModel } from '../../models/billing/BillingAddressModel';
import { addBillingAddresses, addBillingAddressesFailed, addBillingAddressesSuccess, billingAddressesSearching, billingAddressesSearchingFailed, billingAddressesSearchingSuccess, deleteBillingAddresses, deleteBillingAddressesFailed, deleteBillingAddressesSuccess } from './actions';
export type BillingState = {
   billingAddresses : BillingAddressModel[],
   error : string  | null,
   isAdding : boolean,
   isRemoving: boolean,
   isSearching: boolean,
   successMessage : string,
   warningMessage : string,
   billing : BillingAddressModel | null
};

const initialState: BillingState = {
   billingAddresses : [],
   error : "",
   isAdding : false,
   isRemoving: false,
   isSearching: false,
   successMessage : "",
   warningMessage : "",
   billing : null
};

export const BillingReducer = createReducer(initialState, (builder) => {   

   builder.addCase(billingAddressesSearching , (state, {payload}) =>{

      return {
         ...state, 
         warningMessage : '',
         isSearching: payload
      }
   });

   builder.addCase(billingAddressesSearchingSuccess, (state, {payload}) =>{

         return {
            ...state,
            billingAddresses: payload,
            isSearching: false
         }
   });

   builder.addCase(billingAddressesSearchingFailed , (state, {payload}) =>{
         return {
            ...state, 
            isSearching: false,
            error: payload
         }
   });
  
   builder.addCase(addBillingAddresses , (state, {payload}) =>{
      return {...state, isAdding : payload , warningMessage : ''}
   });

   builder.addCase(addBillingAddressesSuccess , (state , {payload}) =>{
      return {
         ...state, 
         billing : payload, 
         isAdding : false, 
         successMessage : "Successfully added to basket"
      }
   });

   builder.addCase(addBillingAddressesFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isAdding : false, 
      }
   });  
  
   builder.addCase(deleteBillingAddresses , (state, {payload}) =>{
      return {...state, isRemoving : payload , warningMessage : ''}
   });

   builder.addCase(deleteBillingAddressesSuccess, (state , {payload}) =>{
      return {
         ...state, 
         billing: payload,
         isRemoving : false, 
         successMessage : "Successfully deleted"
      }
   });

   builder.addCase(deleteBillingAddressesFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload, 
         isRemoving : false
      }
   });   
   
});