import { createReducer } from '@reduxjs/toolkit';   
import { BasketInfoModel, BasketSearchModel, OrderDetails, CheckoutResult, BasketItem } from '../../models/user/basket/BasketModels';
import { GetAllOrders } from '../../services/OrderingService/OrderService';
import { addBasketFailed, addBasketSuccess, addingBasket, basketSearching, basketSearchingFailed, basketSearchingSuccess, checkoutBasket, checkoutBasketFailed, checkoutBasketSuccess, getAllOrders, getAllOrdersByUsername, getAllOrdersByUsernameFailed, getAllOrdersByUsernameSuccess, getAllOrdersFailed, getAllOrdersSuccess, removeBasket, removeBasketFailed, removeBasketItem, removeBasketSuccess, removeBasketItemSuccess, removeBasketItemFailed, updateBasket, updateBasketFailed, updateBasketSuccess, increaseBasketItem, increaseBasketItemSuccess, increaseBasketItemFailed, decreaseBasketItem, decreaseBasketItemSuccess, decreaseBasketItemFailed } from './actions';

export type BasketState = {
   cart : BasketInfoModel,
   error : string  | null,
   isAdding : boolean,
   isUpdating : boolean,
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
   cart : {
      items: [],
      totalPrice: 0,
      totalWeight: 0,
      userName: ""
   },
   error : null,
   isAdding : false,
   isUpdating : false,
   isCheckingOut: false,
   isRemoving: false,
   isOrderFecthing: false,
   isOrderedFecthing: false,
   successMessage : '',
   warningMessage : '',
   basketSearch : {
      isSearching: false,
      error: "",
      searchResult: {
         items: [],
         totalPrice: 0,
         totalWeight: 0,
         userName: ""
      }
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
            cart: payload,
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
  
   builder.addCase(updateBasket , (state, {payload}) =>{
      return {...state, isUpdating : payload , warningMessage : ''}
   });

   builder.addCase(updateBasketSuccess , (state , {payload}) =>{

      var tempItems: BasketItem[] = [...state.cart?.items];

      tempItems.push(payload);

      return {
         ...state, 
         cart : {
            userName: state.cart.userName,
            items: tempItems,
            totalPrice: 0,
            totalWeight: 0,
         }, 
         isUpdating : false, 
         successMessage : "Successfully updated to basket"
      }
   });

   builder.addCase(updateBasketFailed , (state,{payload}) =>{
      return {
         ...state, 
         error : payload,
         isUpdating : false, 
      }
   }); 

   builder.addCase(removeBasket , (state, {payload}) =>{
      return {...state, isRemoving : payload , warningMessage : ''}
   });

   builder.addCase(removeBasketSuccess, (state , {payload}) =>{
      return {
         ...state, 
         cart : {
            items: [],
            totalPrice: 0,
            totalWeight: 0,
            userName: ""
         }, 
         basketSearch: {
            isSearching: false,
            error: '',
            searchResult: {
               items: [],
               totalPrice: 0,
               totalWeight: 0,
               userName: ""
            }
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
// removing an item from the basket
builder.addCase(removeBasketItem, (state, { payload }) => {
   return { ...state, isRemoving: payload, warningMessage: '' };
 });
 
 builder.addCase(removeBasketItemSuccess, (state, { payload }) => {
   const { username, productId } = payload;
   const itemToRemove = state.cart.items.find(item => item.productId === productId);
   const updatedItems = state.cart.items.filter(item => item.productId !== productId);
   const updatedTotalPrice = itemToRemove ? state.cart.totalPrice - itemToRemove.price : state.cart.totalPrice;
   const updatedTotalWeight = itemToRemove ? state.cart.totalWeight - itemToRemove.weight : state.cart.totalWeight;

   return {
     ...state,
     cart: {
       ...state.cart,
       items: updatedItems,
       totalPrice: updatedTotalPrice,
       totalWeight: updatedTotalWeight,
       username: username
     },
     isRemoving: false,
     successMessage: "item successfully removed"
   };
 });
 
 builder.addCase(removeBasketItemFailed, (state, { payload }) => {
   return { ...state, error: payload, isRemoving: false };
 });
 
//end
// increamenting the quantity of an item in the basket 
builder.addCase(increaseBasketItemSuccess, (state, { payload }) => {
   const { usernamed, deletedProductId, value } = payload;
   const itemToUpdateIndex = state.cart.items.findIndex(item => item.productId === deletedProductId);
   const itemToUpdate = state.cart.items[itemToUpdateIndex];
   const updatedItems = [...state.cart.items];
   const updatedTotalPrice = state.cart.totalPrice + (value  * itemToUpdate.price);
   const updatedTotalWeight = state.cart.totalWeight + (value  * itemToUpdate.weight);
 
   if (itemToUpdateIndex >= 0) {
     updatedItems[itemToUpdateIndex] = {
       ...itemToUpdate,
       quantity:  value + itemToUpdate.quantity,
       weight: itemToUpdate.weight + 1,
       subTotal: itemToUpdate.price * (itemToUpdate.quantity + value)
     };
   } 
   return {
     ...state,
     cart: {
       ...state.cart,
       items: updatedItems,
       totalPrice: updatedTotalPrice,
       totalWeight: updatedTotalWeight,
       username: usernamed
     },
     isAdding: false,
     successMessage: "item successfully successfully increamented"
   };
 });
 builder.addCase(increaseBasketItemFailed, (state, { payload }) => {
   return { ...state, error: payload, isAdding: false };
 });
 
//end
// increamenting the quantity of an item in the basket 
builder.addCase(decreaseBasketItemSuccess, (state, { payload }) => {
   const { usernamed, deletedProductId, value } = payload;
   const itemToUpdateIndex = state.cart.items.findIndex(item => item.productId === deletedProductId);
   const itemToUpdate = state.cart.items[itemToUpdateIndex];
   const updatedItems = [...state.cart.items];
   const updatedTotalPrice = (itemToUpdate.quantity - value) <= 0 ? state.cart.totalPrice : state.cart.totalPrice - (value * itemToUpdate.price);
   const updatedTotalWeight = (itemToUpdate.quantity - value) <= 0 ? state.cart.totalWeight : state.cart.totalWeight - (value * itemToUpdate.weight);
 
   if (itemToUpdateIndex >= 0) {
     updatedItems[itemToUpdateIndex] = {
       ...itemToUpdate,
       quantity: (itemToUpdate.quantity - value) <= 0 ? itemToUpdate.quantity : itemToUpdate.quantity - value,
       weight: (itemToUpdate.quantity - value) <= 0 ? itemToUpdate.weight : itemToUpdate.weight - value,
       subTotal: (itemToUpdate.quantity - value) <= 0 ? itemToUpdate.subTotal : itemToUpdate.subTotal - (value * itemToUpdate.price)
     };
   } 
   return {
     ...state,
     cart: {
       ...state.cart,
       items: updatedItems,
       totalPrice: updatedTotalPrice,
       totalWeight: updatedTotalWeight,
       username: usernamed
     },
     isAdding: false,
     successMessage: "item quantity successfully decreamented"
   };
 });
 builder.addCase(decreaseBasketItemFailed, (state, { payload }) => {
   return { ...state, error: payload, isAdding: false };
 });
 
//end
   
   builder.addCase(checkoutBasket , (state, {payload}) =>{
      return {...state, isCheckingOut : payload , warningMessage : ''}
   });

   builder.addCase(checkoutBasketSuccess , (state , {payload}) =>{
      return {
         ...state, 
         cart: {
            items: [],
            totalPrice: 0,
            totalWeight: 0,
            userName: ""
         },
         basketSearch: {
            error: '',
            isSearching: false,
            searchResult: {
               items: [],
               totalPrice: 0,
               totalWeight: 0,
               userName: ""
            }
         },
         isCheckingOut : false, 
         successMessage : "Successfully ordered"
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