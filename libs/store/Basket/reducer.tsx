import { createReducer } from '@reduxjs/toolkit';   
import { BasketInfoModel, BasketSearchModel, OrderDetails, CheckoutResult } from '../../models/user/basket/BasketModels';
import { GetAllOrders } from '../../services/OrderingService/OrderService';
import { addBasketFailed, addBasketSuccess, addingBasket, basketSearching, basketSearchingFailed, basketSearchingSuccess, checkoutBasket, checkoutBasketFailed, checkoutBasketSuccess, getAllOrders, getAllOrdersByUsername, getAllOrdersByUsernameFailed, getAllOrdersByUsernameSuccess, getAllOrdersFailed, getAllOrdersSuccess, removeBasket, removeBasketFailed, removeBasketSuccess } from './actions';

export type BasketState = {
   cart : BasketInfoModel | null,
   error : string  | null,
   isAdding : boolean,
   isCheckingOut: boolean,
   isRemoving: boolean,
   isOrderFecthing: boolean,
   isOrderedFecthing: boolean,
   successMessage : string,
   warningMessage : string,
   basketSearch : BasketSearchModel,
   orderInfo: OrderDetails | null,
   orders: OrderDetails[],
   ordersByUser: OrderDetails[],
   checkoutResult: CheckoutResult | null
};

const initialState: BasketState = {
   cart : null,
   error : null,
   isAdding : false,
   isCheckingOut: false,
   isRemoving: false,
   isOrderFecthing: false,
   isOrderedFecthing: false,
   successMessage : '',
   warningMessage : '',
   basketSearch : {
      isSearching: false,
      error: "",
      searchResult: null
   },
   orderInfo: null,
   orders: [],
   ordersByUser: [],
   checkoutResult: null
};

export const BasketReducer = createReducer(initialState, (builder) => {   

   builder.addCase(basketSearching , (state, {payload}) =>{

      return {
         ...state, 
         warningMessage : '',
         basketSearch :{...state.basketSearch , error : null, isSearching : payload}
      }
   });

   builder.addCase(basketSearchingSuccess, (state, {payload}) =>{

         return {
            ...state,
            basketSearch : {
               searchResult : payload,
               isSearching : false,
               error : null
            }
         }
   });

   builder.addCase(basketSearchingFailed , (state, {payload}) =>{
         return {
            ...state, 
            dishSearch:{...state.basketSearch, error: payload} 
         }
   });
  
   builder.addCase(addingBasket , (state, {payload}) =>{
      return {...state, isAdding : payload , warningMessage : ''}
   });

   builder.addCase(addBasketSuccess , (state , {payload}) =>{
      return {
         ...state, 
         cart : { ...payload }, 
         isAdding : false, 
         successMessage : "Successfully added to basket"
      }
   });

   builder.addCase(addBasketFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isAdding : false, 
      }
   });   
  
   builder.addCase(removeBasket , (state, {payload}) =>{
      return {...state, isRemoving : payload , warningMessage : ''}
   });

   builder.addCase(removeBasketSuccess, (state , {payload}) =>{
      return {
         ...state, 
         cart : null, 
         basketSearch: {
            isSearching: false,
            error: '',
            searchResult: null
         },
         isRemoving : false, 
         successMessage : payload
      }
   });

   builder.addCase(removeBasketFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload, 
         isRemoving : false
      }
   });   

   
   builder.addCase(checkoutBasket , (state, {payload}) =>{
      return {...state, isCheckingOut : payload , warningMessage : ''}
   });

   builder.addCase(checkoutBasketSuccess , (state , {payload}) =>{
      return {
         ...state, 
         cart: null,
         basketSearch: {
            error: '',
            isSearching: false,
            searchResult: null
         },
         isCheckingOut : false, 
         successMessage : "Successfully ordered",
         checkoutResult: payload
      }
   });

   builder.addCase(checkoutBasketFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isCheckingOut : false, 
      }


   });  

   builder.addCase(getAllOrders , (state, {payload}) =>{
      return {...state, isOrderFecthing : payload , warningMessage : ''}
   });

   builder.addCase(getAllOrdersSuccess , (state , {payload}) =>{
      return {
         ...state, 
         isOrderFecthing : false, 
         orders: payload
      }
   });

   builder.addCase(getAllOrdersFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isOrderFecthing : false, 
      }

      
   });  
   
   builder.addCase(getAllOrdersByUsername , (state, {payload}) =>{
      return {...state, isOrderedFecthing : payload , warningMessage : ''}
   });

   builder.addCase(getAllOrdersByUsernameSuccess , (state , {payload}) =>{
      return {
         ...state, 
         isOrderedFecthing : false, 
         ordersByUser: payload
      }
   });

   builder.addCase(getAllOrdersByUsernameFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isOrderedFecthing : false, 
      }      
   });  
   
});