import { createReducer } from "@reduxjs/toolkit";
import { DiscountModel } from "../../models/discount/DiscountModel";
import { addDiscountByName, addDiscountByNameFailed, addDiscountByNameSuccess, discountSearching, discountSearchingFailed, discountSearchingSuccess, getDiscounts, getDiscountsFailed, getDiscountsSuccess } from "./actions";


export type DiscountState = {
   discount : DiscountModel | null,
   error : string  | null,
   isAdding : boolean,
   isGetting : boolean,
   successMessage : string,
   warningMessage : string,
   discounts : DiscountModel[]
};

const initialState: DiscountState = {
   discount : null,
   error : null,
   isAdding : false,
   isGetting : false,
   successMessage : '',
   warningMessage : '',
   discounts : []
};

export const DiscountReducer = createReducer(initialState, (builder) => {   

   builder.addCase(discountSearching , (state, {payload}) =>{

      return {
         ...state, 
         warningMessage : '',
         isGetting: payload
      }
   });

   builder.addCase(discountSearchingSuccess, (state, {payload}) =>{

         return {
            ...state,
            isGetting: false,
            discount: payload
         }
   });

   builder.addCase(discountSearchingFailed, (state, {payload}) =>{
         return {
            ...state, 
            isGetting: false,
            error: payload
         }
   });
  
   builder.addCase(addDiscountByName, (state, {payload}) =>{
      return {...state, isAdding : payload , warningMessage : ''}
   });

   builder.addCase(addDiscountByNameSuccess, (state , {payload}) =>{
      return {
         ...state,
         isAdding: false,
         discount: payload
      }
   });

   builder.addCase(addDiscountByNameFailed, (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isAdding: false
      }
   });   

   
  
   builder.addCase(getDiscounts, (state, {payload}) =>{
      return {...state, isGetting : payload , warningMessage : ''}
   });

   builder.addCase(getDiscountsSuccess, (state , {payload}) =>{
      return {
         ...state,
         isGetting: false,
         discounts: payload
      }
   });

   builder.addCase(getDiscountsFailed, (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isGetting: false
      }
   });   
});