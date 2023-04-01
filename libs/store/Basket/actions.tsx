import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BasketInfoModel, BasketModel, OrderDetails, CheckoutResult, BasketItem, DeleteBasketItemModel, increaseQuantityModel, decreaseQuantityModel } from "../../models/user/basket/BasketModels";
import { AddToCart, BasketCheckoutAndOrder, GetBasketByUserName, IncreaseItemQuantiy, RemoveCart, RemoveCartItem, DecreaseItemQuantiy } from "../../services/BasketService/BasketService";
import { GetAllOrders,GetOrdersByUsername } from "../../services/OrderingService/OrderService";
import { BasketActionType } from "./actions-type";

// search basket
export const basketSearching = createAction<boolean>(BasketActionType.BASKET_SEARCHING);
export const basketSearchingSuccess = createAction<BasketInfoModel>(BasketActionType.BASKET_SEARCHING_SUCCESS);
export const basketSearchingFailed = createAction<string>(BasketActionType.BASKET_SEARCHING_FAILED);
// add basket
export const addingBasket  = createAction<boolean>(BasketActionType.ADD_BASKET_TO_DB);
export const addBasketSuccess = createAction<BasketInfoModel>(BasketActionType.ADD_BASKET_SUCCESS)
export const addBasketFailed = createAction<string>(BasketActionType.ADD_BASKET_FAILED);
// update basket
export const updateBasket  = createAction<boolean>(BasketActionType.UPDATE_BASKET_DB);
export const updateBasketSuccess = createAction<BasketItem>(BasketActionType.UPDATE_BASKET_SUCCESS)
export const updateBasketFailed = createAction<string>(BasketActionType.UPDATE_BASKET_FAILED);
// Checkout basket
export const checkoutBasket  = createAction<boolean>(BasketActionType.BASKET_CHECKOUT);
export const checkoutBasketSuccess = createAction<CheckoutResult>(BasketActionType.BASKET_CHECKOUT_SUCCESS)
export const checkoutBasketFailed = createAction<string>(BasketActionType.BASKET_CHECKOUT_FAILED);
// Remove basket
export const removeBasket  = createAction<boolean>(BasketActionType.REMOVE_BASKET_BY_USERNAME);
export const removeBasketSuccess = createAction<string>(BasketActionType.REMOVE_BASKET_BY_USERNAME_SUCCESS)
export const removeBasketFailed = createAction<string>(BasketActionType.REMOVE_BASKET_BY_USERNAME_FAILED);
// Remove basket item 
export const removeBasketItem  = createAction<boolean>(BasketActionType.REMOVE_BASKETPRODUCT_BY_PRODUCTID);
export const removeBasketItemSuccess = createAction<DeleteBasketItemModel>(BasketActionType.REMOVE_BASKETPRODUCT_BY_PRODUCTID_SUCCESS)
export const removeBasketItemFailed = createAction<string>(BasketActionType.REMOVE_BASKETPRODUCT_BY_PRODUCTID_FAILED);
// increase quantiy of  basket item 
export const increaseBasketItem  = createAction<boolean>(BasketActionType.INCREASE_BASKETPRODUCT_BY_PRODUCTID);
export const increaseBasketItemSuccess = createAction<increaseQuantityModel>(BasketActionType.INCREASE_BASKETPRODUCT_BY_PRODUCTID_SUCCESS)
export const increaseBasketItemFailed = createAction<string>(BasketActionType.INCREASE_BASKETPRODUCT_BY_PRODUCTID_FAILED);
// decrease quantiy of  basket item 
export const decreaseBasketItem  = createAction<boolean>(BasketActionType.DECREASE_BASKETPRODUCT_BY_PRODUCTID);
export const decreaseBasketItemSuccess = createAction<decreaseQuantityModel>(BasketActionType.DECREASE_BASKETPRODUCT_BY_PRODUCTID_SUCCESS)
export const decreaseBasketItemFailed = createAction<string>(BasketActionType.DECREASE_BASKETPRODUCT_BY_PRODUCTID_FAILED);
// get all orders
export const getAllOrders  = createAction<boolean>(BasketActionType.GET_ALL_ORDERS);
export const getAllOrdersSuccess = createAction<OrderDetails[]>(BasketActionType.GET_ALL_ORDERS_SUCCESS)
export const getAllOrdersFailed = createAction<string>(BasketActionType.GET_ALL_ORDERS_FAILED);
// get orders by username
export const getAllOrdersByUsername  = createAction<boolean>(BasketActionType.GET_ALL_ORDERS_BY_USERNAME);
export const getAllOrdersByUsernameSuccess = createAction<OrderDetails[]>(BasketActionType.GET_ALL_ORDERS_BY_USERNAME_SUCCESS)
export const getAllOrdersByUsernameFailed = createAction<string>(BasketActionType.GET_ALL_ORDERS_BY_USERNAME_FAILED);


export const searchBasketsData = createAsyncThunk( BasketActionType.BASKET_SEARCHING, 
   async( keyword : string, thunkAPI )=>{

    thunkAPI.dispatch(basketSearching(true));
    try{
       
       const response = await GetBasketByUserName(keyword);
       thunkAPI.dispatch(basketSearchingSuccess(response));

    }catch(error){

       var errorMessage = (error as string);
       thunkAPI.dispatch(basketSearchingFailed(errorMessage))
    }
});

export const AddBasketToDB = createAsyncThunk(BasketActionType.ADD_BASKET_TO_DB,
    async(addBasketModel : BasketModel , thunkAPI) =>{
      try{

         thunkAPI.dispatch(addingBasket(true));
         let result = await AddToCart(addBasketModel);

         console.log(result);

         thunkAPI.dispatch(addBasketSuccess(result));

         return result;

       }catch(e){
           var erroMessage = (e as string);
           thunkAPI.dispatch(addBasketFailed(erroMessage));
      }
});


export const UpdateBasketDB = createAsyncThunk(BasketActionType.UPDATE_BASKET_DB,
   async(basketItem: BasketItem, thunkAPI) =>{
     try{

        await thunkAPI.dispatch(updateBasket(true));
        await thunkAPI.dispatch(updateBasketSuccess(basketItem));

      }catch(e){
          var erroMessage = (e as string);
          await thunkAPI.dispatch(updateBasketFailed(erroMessage));
     }
});

export const RemoveBasketById = createAsyncThunk(BasketActionType.REMOVE_BASKET_BY_USERNAME , async(id : string, thunkAPI) =>{
   try{

      thunkAPI.dispatch(removeBasket(true));
      let result = await RemoveCart(id);
      thunkAPI.dispatch(removeBasketSuccess("Successfully removed"));

      return result;

    }
    catch(e){
        var erroMessage = (e as string);
        thunkAPI.dispatch(removeBasketFailed(erroMessage));
   }
   
});
// an action to remove basket item
 export const RemoveBasketItemById = createAsyncThunk(BasketActionType.REMOVE_BASKETPRODUCT_BY_PRODUCTID , async(basket: DeleteBasketItemModel, thunkAPI)  =>{
   try{
      
      thunkAPI.dispatch(removeBasketItem(true));
      let result = await RemoveCartItem(basket.username, basket.productId);
      thunkAPI.dispatch(removeBasketItemSuccess(basket));

      return result;

    }
    catch(e){
        var erroMessage = (e as string);
        thunkAPI.dispatch(removeBasketItemFailed(erroMessage));
   }
   
});
//
// action to increament quantity of basket item
export const IncreaseBasketItemById = createAsyncThunk(BasketActionType.INCREASE_BASKETPRODUCT_BY_PRODUCTID , async(basket: increaseQuantityModel, thunkAPI)  =>{
   try{
      
      thunkAPI.dispatch(increaseBasketItem(true));
      let result = await IncreaseItemQuantiy(basket.usernamed, basket.deletedProductId, basket.value);
      thunkAPI.dispatch(increaseBasketItemSuccess(basket));

      return result;

    }
    catch(e){
        var erroMessage = (e as string);
        thunkAPI.dispatch(increaseBasketItemFailed(erroMessage));
   }
   
});
//
// an action to dreament quantity of basket item
export const decreaseBasketItemById = createAsyncThunk(BasketActionType.DECREASE_BASKETPRODUCT_BY_PRODUCTID , async(basket: decreaseQuantityModel, thunkAPI)  =>{
   try{
      
      thunkAPI.dispatch(decreaseBasketItem(true));
      let result = await DecreaseItemQuantiy(basket.usernamed, basket.decreasedProductId, basket.value);
      thunkAPI.dispatch(decreaseBasketItemSuccess(basket));

      return result;

    }
    catch(e){
        var erroMessage = (e as string);
        thunkAPI.dispatch(decreaseBasketItemFailed(erroMessage));
   }
   
});
//
export const CheckoutBasket = createAsyncThunk(BasketActionType.BASKET_CHECKOUT,
    async(checkoutBasketData : OrderDetails, thunkAPI) =>{
      try{

         thunkAPI.dispatch(checkoutBasket(true));
         let result = await BasketCheckoutAndOrder(checkoutBasketData);

         thunkAPI.dispatch(checkoutBasketSuccess(result));

       }catch(e){
           var erroMessage = (e as string);
           thunkAPI.dispatch(checkoutBasketFailed(erroMessage));
      }
});

export const GetOrderedProducts = createAsyncThunk(BasketActionType.GET_ALL_ORDERS,
   async(data: string, thunkAPI) =>{
     try{

        thunkAPI.dispatch(getAllOrders(true));
        let result = await GetAllOrders();

        thunkAPI.dispatch(getAllOrdersSuccess(result));

      }catch(e){
          var erroMessage = (e as string);
          thunkAPI.dispatch(getAllOrdersFailed(erroMessage));
     }
});

export const GetOrderedProductsByUsername = createAsyncThunk(BasketActionType.GET_ALL_ORDERS_BY_USERNAME,
   async(username: string, thunkAPI) =>{
     try{

        thunkAPI.dispatch(getAllOrdersByUsername(true));
        let result = await GetOrdersByUsername(username);

        thunkAPI.dispatch(getAllOrdersByUsernameSuccess(result));

      }catch(e){
          var erroMessage = (e as string);
          thunkAPI.dispatch(getAllOrdersByUsernameFailed(erroMessage));
     }
});
