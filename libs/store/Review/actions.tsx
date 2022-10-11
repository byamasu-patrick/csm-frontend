import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateReviewDto, ProductReviewModel } from "../../models/reviews/ReviewModels";
import { AddProductReview } from "../../services/ReviewService/ReviewService";
import { ProductReviewActionType } from "./actions-type";

// add product
export const addingProductReview  = createAction<boolean>(ProductReviewActionType.ADDING_PRODUCT_REVIEW);
export const addProductReviewSuccess = createAction<ProductReviewModel>(ProductReviewActionType.ADD_PRODUCT_REVIEW_SUCCESS)
export const addProductReviewFailed = createAction<string>(ProductReviewActionType.ADD_PRODUCT_REVIEW_FAILED);


export const AddProductReviewToDB = createAsyncThunk(ProductReviewActionType.ADDING_PRODUCT_REVIEW,
    async(addProductRewiewModel : CreateReviewDto , thunkAPI) =>{
      try{

         thunkAPI.dispatch(addingProductReview(true));
         let result = await AddProductReview(addProductRewiewModel);
         thunkAPI.dispatch(addProductReviewSuccess(result));

         return result;

       }catch(e){
           var erroMessage = (e as string);
           thunkAPI.dispatch(addProductReviewFailed(erroMessage));
      }
});
