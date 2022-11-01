import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateDiscountModel, DiscountModel } from "../../models/discount/DiscountModel";
import { createDiscount, getDiscountByName, getDiscountService } from "../../services/DiscountService/DiscountService";
import { DiscountActionType } from "./actions-type";

// search product
export const discountSearching = createAction<boolean>(DiscountActionType.SEARCH_DISCOUNT);
export const discountSearchingSuccess = createAction<DiscountModel>(DiscountActionType.SEARCH_DISCOUNT_SUCCESS);
export const discountSearchingFailed = createAction<string>(DiscountActionType.SEARCH_DISCOUNT_FAILED);
// add promotion to a products
export const addDiscountByName  = createAction<boolean>(DiscountActionType.ADD_DISCOUNT);
export const addDiscountByNameSuccess = createAction<DiscountModel>(DiscountActionType.ADD_DISCOUNT_SUCCESS)
export const addDiscountByNameFailed = createAction<string>(DiscountActionType.ADD_DISCOUNT_FAILED);
// Get all the promotions
export const getDiscounts  = createAction<boolean>(DiscountActionType.GET_DISCOUNTS);
export const getDiscountsSuccess = createAction<DiscountModel[]>(DiscountActionType.GET_DISCOUNTS_SUCCESS)
export const getDiscountsFailed = createAction<string>(DiscountActionType.GET_DISCOUNTS_FAILED);



export const searchDiscountFromDB = createAsyncThunk(DiscountActionType.SEARCH_DISCOUNT, 
   async( keyword : string, thunkAPI )=>{

    thunkAPI.dispatch(discountSearching(true));

    try{
       
       const response = await getDiscountByName(keyword);
       thunkAPI.dispatch(discountSearchingSuccess(response));

    }catch(error){

       var errorMessage = (error as string);
       thunkAPI.dispatch(discountSearchingFailed(errorMessage))
    }
});

export const addDiscountToDB = createAsyncThunk(DiscountActionType.ADD_DISCOUNT,
    async(discountModel : CreateDiscountModel , thunkAPI) =>{
      try{
        // console.log(discountModel);
         thunkAPI.dispatch(addDiscountByName(true));
         let result: DiscountModel = await createDiscount(discountModel);
         thunkAPI.dispatch(addDiscountByNameSuccess(result));

         return result;

       }catch(e){
           var erroMessage = (e as string);
           thunkAPI.dispatch(addDiscountByNameFailed(erroMessage));
      }
});

export const getDiscountsFromDB = createAsyncThunk(DiscountActionType.GET_DISCOUNTS,    
    async(isDiscount : boolean , thunkAPI) =>{
      try{
        // console.log(discountModel);
         thunkAPI.dispatch(getDiscounts(true));
         let result: DiscountModel[] = await getDiscountService();
         thunkAPI.dispatch(getDiscountsSuccess(result));

         return result;

       }catch(e){
           var erroMessage = (e as string);
           thunkAPI.dispatch(getDiscountsFailed(erroMessage));
      }
});

