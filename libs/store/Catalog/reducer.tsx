import { createReducer } from '@reduxjs/toolkit';   
import { ProductModel, ProductSearchModel } from '../../models/shops/catalogs/ProductModels';
import { adddProductFailed, addingProduct, addProductSuccess, editFailed, editingProduct, editSuccess, getAllProductsByShopOwnerFailed, getAllProductsByShopOwnerSuccess, getAllProductsFailed, getAllProductsSuccess, gettingAllProducts, gettingAllProductsByShopOwner, productSearching, productSearchingFailed, productSearchingSuccess } from './actions';

export type ProductState = {
   product : ProductModel | null,
   error : string  | null,
   isAdding : boolean,
   isEditing : boolean,
   isGetting : boolean,
   isGettingByOwner : boolean,
   successMessage : string,
   warningMessage : string,
   products : ProductModel[], 
   productSearch : ProductSearchModel
};

const initialState: ProductState = {
   product : null,
   error : "",
   isAdding : false,
   isEditing : false,
   isGetting : false,
   isGettingByOwner : false,
   successMessage : "",
   warningMessage : "",
   products : [], 
   productSearch : {
      isSearching: false,
      error: "",
      searchResult: null
   }
};

export const ProductReducer = createReducer(initialState, (builder) => {   

   builder.addCase(productSearching , (state, {payload}) =>{

      return {
         ...state, 
         warningMessage : '',
         productSearch :{...state.productSearch , error : null, isSearching : payload}
      }
   });

   builder.addCase(productSearchingSuccess, (state, {payload}) =>{

         return {
            ...state,
            productSearch : {
               searchResult : payload,
               isSearching : false,
               error : null
            }
         }
   });

   builder.addCase(productSearchingFailed , (state, {payload}) =>{
         return {
            ...state, 
            dishSearch:{...state.productSearch, error: payload} 
         }
   });
  
   builder.addCase(addingProduct , (state, {payload}) =>{
      return {...state, isAdding : payload , warningMessage : ''}
   });

   builder.addCase(addProductSuccess , (state , {payload}) =>{
      return {
         ...state, 
         product : state.product, 
         isAdding : !state.isAdding, 
         successMessage : payload
      }
   });

   builder.addCase(adddProductFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isAdding : !state.isAdding, 
      }
   });   

   builder.addCase(editingProduct , (state , {payload}) =>{
      return {...state, isEditing : payload}
   });

   builder.addCase(editSuccess , (state , {payload}) =>{
      return {
         ...state, 
         successMessage: payload, 
         isEditing: !state.isEditing,
         product: state.product         
      }
   });

   builder.addCase(editFailed , (state , {payload}) =>{
      return {
         ...state, 
         isEditing: !state.isEditing,
         error: payload       
      }
   });    

   builder.addCase(gettingAllProducts , (state , {payload}) =>{
      return {...state, isGetting : payload}
   });

   builder.addCase(getAllProductsSuccess , (state , {payload}) =>{




      return {
         ...state,  
         isGetting: !state.isGetting,
         products: payload       
      }
   });

   builder.addCase(getAllProductsFailed , (state , {payload}) =>{

      console.log("State: ", state);
      console.log("Payload: ", payload);

      return {
         ...state, 
         isGetting : !state.isGetting, 
         error: payload
      }
   });    

   builder.addCase(gettingAllProductsByShopOwner , (state , {payload}) =>{
      return {...state, isGettingByOwner : payload}
   });

   builder.addCase(getAllProductsByShopOwnerSuccess , (state , {payload}) =>{
      return {
         ...state,  
         isGettingByOwner: !state.isGettingByOwner,
         products: state.products         
      }
   });

   builder.addCase(getAllProductsByShopOwnerFailed , (state , {payload}) =>{
      return {...state, isGettingByOwner : !state.isGettingByOwner, error: payload}
   });

});