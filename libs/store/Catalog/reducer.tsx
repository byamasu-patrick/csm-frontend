import { createReducer } from '@reduxjs/toolkit';   
import { ProductModel, ProductResponse, ProductSearchModel } from '../../models/shops/catalogs/ProductModels';
import { adddProductFailed, addingProduct, addProductSuccess, editFailed, editingProduct, editSuccess, getAllProductsByCategoryFailed, getAllProductsByCategorySuccess, getAllProductsByShopOwnerFailed, getAllProductsByShopOwnerSuccess, getAllProductsFailed, getAllProductsSuccess, gettingAllProducts, gettingAllProductsByCategory, gettingAllProductsByShopOwner, productSearching, productSearchingFailed, productSearchingSuccess } from './actions';

export type ProductState = {
   product : ProductModel | null,
   error : string  | null,
   isAdding : boolean,
   isEditing : boolean,
   isGetting : boolean,
   isGettingByOwner : boolean,
   isGettingCategory : boolean,
   successMessage : string,
   warningMessage : string,
   products : ProductResponse,
   productsByCategory : ProductResponse,  
   productsOwner: ProductModel[],
   productSearch : ProductSearchModel
};

const initialState: ProductState = {
   product : null,
   error : "",
   isAdding : false,
   isEditing : false,
   isGetting : false,
   isGettingByOwner : false,
   isGettingCategory : false,
   successMessage : "",
   warningMessage : "",
   products : {
      currentPage: 0,
      results: [],
      totalPages: 0
   }, 
   productsOwner: [],
   productsByCategory: {
      currentPage: 0,
      results: [],
      totalPages: 0
   },  
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
         isEditing: false,
         product: state.product         
      }
   });

   builder.addCase(editFailed , (state , {payload}) =>{
      return {
         ...state, 
         isEditing: false,
         error: payload       
      }
   });    

   builder.addCase(gettingAllProducts , (state , {payload}) =>{
      return {...state, isGetting : payload}
   });

   builder.addCase(getAllProductsSuccess , (state , {payload}) =>{
      return {
         ...state,  
         isGetting: false,
         products: {...payload}       
      }
   });

   builder.addCase(getAllProductsFailed , (state , {payload}) =>{

      console.log("State: ", state);
      console.log("Payload: ", payload);

      return {
         ...state, 
         isGetting : false, 
         error: payload
      }
   });    

   builder.addCase(gettingAllProductsByShopOwner , (state , {payload}) =>{
      return {...state, isGettingByOwner : payload}
   });

   builder.addCase(getAllProductsByShopOwnerSuccess , (state , {payload}) =>{
      return {
         ...state,  
         isGettingByOwner: false,
         productsOwner: [...payload]         
      }
   });

   builder.addCase(getAllProductsByShopOwnerFailed , (state , {payload}) =>{
      return {...state, isGettingByOwner : false, error: payload}
   }); 

   builder.addCase(gettingAllProductsByCategory , (state , {payload}) =>{
      return {...state, isGettingCategory : payload}
   });

   builder.addCase(getAllProductsByCategorySuccess , (state , {payload}) =>{
      return {
         ...state,  
         isGettingCategory: false,
         productsByCategory: {
            ...payload
         }         
      }
   });

   builder.addCase(getAllProductsByCategoryFailed , (state , {payload}) =>{
      return {...state, isGettingByOwner : false, error: payload}
   });

});