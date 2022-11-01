import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AddBillingAddressModel, BillingAddressModel } from "../../models/billing/BillingAddressModel";
import { BasketInfoModel, BasketModel, OrderDetails, CheckoutResult, BasketItem } from "../../models/user/basket/BasketModels";
import { AddToCart, BasketCheckoutAndOrder, GetBasketByUserName, RemoveCart } from "../../services/BasketService/BasketService";
import { AddBillingAddressService, DeleteBillingAddressService, SearchBillingAddresseService } from "../../services/BillingService/BillingService";
import { GetAllOrders,GetOrdersByUsername } from "../../services/OrderingService/OrderService";
import { BillingActionType } from "./actions-type";

// search billing
export const billingAddressesSearching = createAction<boolean>(BillingActionType.BILLING_ADDRESSES_SEARCHING);
export const billingAddressesSearchingSuccess = createAction<BillingAddressModel[]>(BillingActionType.BILLING_ADDRESSES_SEARCHING_SUCCESS);
export const billingAddressesSearchingFailed = createAction<string>(BillingActionType.BILLING_ADDRESSES_SEARCHING_FAILED);
// add billing
export const addBillingAddresses  = createAction<boolean>(BillingActionType.ADD_BILLING_ADDRESSES);
export const addBillingAddressesSuccess = createAction<BillingAddressModel>(BillingActionType.ADD_BILLING_ADDRESSES_SUCCESS)
export const addBillingAddressesFailed = createAction<string>(BillingActionType.ADD_BILLING_ADDRESSES_FAILED);
// delete billing
export const deleteBillingAddresses  = createAction<boolean>(BillingActionType.DELETE_BILLING_ADDRESSES);
export const deleteBillingAddressesSuccess = createAction<BillingAddressModel>(BillingActionType.DELETE_BILLING_ADDRESSES_SUCCESS)
export const deleteBillingAddressesFailed = createAction<string>(BillingActionType.DELETE_BILLING_ADDRESSES_FAILED);


export const searchBillingAddressData = createAsyncThunk(BillingActionType.BILLING_ADDRESSES_SEARCHING, 
   async( keyword : string, thunkAPI )=>{

    thunkAPI.dispatch(billingAddressesSearching(true));
    try{
       
       const response = await SearchBillingAddresseService(keyword);

       console.log(response);
       thunkAPI.dispatch(billingAddressesSearchingSuccess(response));

    }catch(error){

       var errorMessage = (error as string);
       thunkAPI.dispatch(billingAddressesSearchingFailed(errorMessage))
    }
});

export const AddBillingAddressToDB = createAsyncThunk(BillingActionType.ADD_BILLING_ADDRESSES,
    async(addBillingModel : AddBillingAddressModel, thunkAPI) =>{
      try{

         thunkAPI.dispatch(addBillingAddresses(true));
         let result = await AddBillingAddressService(addBillingModel);

         console.log(result);

         thunkAPI.dispatch(addBillingAddressesSuccess(result));

         return result;

       }catch(e){
           var erroMessage = (e as string);
           thunkAPI.dispatch(addBillingAddressesFailed(erroMessage));
      }
});

export const DeleteBillingAddressDB = createAsyncThunk(BillingActionType.DELETE_BILLING_ADDRESSES,
   async(id : string , thunkAPI) =>{
     try{

        thunkAPI.dispatch(deleteBillingAddresses(true));
        let result = await DeleteBillingAddressService(id);

        console.log(result);

        thunkAPI.dispatch(deleteBillingAddressesSuccess(result));

        return result;

      }catch(e){
          var erroMessage = (e as string);
          thunkAPI.dispatch(deleteBillingAddressesFailed(erroMessage));
     }
});

