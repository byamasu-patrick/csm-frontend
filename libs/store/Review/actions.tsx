import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateReviewDto, ProductReviewModel, ProductReviewResponse } from "../../models/reviews/ReviewModels";
import { AddProductReview, GetProductReviews } from "../../services/ReviewService/ReviewService";
import { ProductReviewActionType } from "./actions-type";

// add product
export const addingProductReview  = createAction<boolean>(ProductReviewActionType.ADDING_PRODUCT_REVIEW);
export const addProductReviewSuccess = createAction<ProductReviewModel>(ProductReviewActionType.ADD_PRODUCT_REVIEW_SUCCESS)
export const addProductReviewFailed = createAction<string>(ProductReviewActionType.ADD_PRODUCT_REVIEW_FAILED);
// get all product reviews
export const gettingAllProductReviews  = createAction<boolean>(ProductReviewActionType.GET_ALL_PRODUCT_REVIEWS);
export const getAllProductReviewsSuccess = createAction<ProductReviewResponse>(ProductReviewActionType.GET_ALL_PRODUCT_REVIEWS_SUCCESS)
export const getAllProductReviewsFailed = createAction<string>(ProductReviewActionType.GET_ALL_PRODUCT_REVIEWS_FAILED);

interface Review{
  productId: string;
  page: number;
}

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


export const GetAllProductReviews = createAsyncThunk(ProductReviewActionType.GET_ALL_PRODUCT_REVIEWS, 
  async(review: Review, thunkAPI) =>{
      try{

           thunkAPI.dispatch(gettingAllProductReviews(true));

           let result = await GetProductReviews(review.productId, review.page);

           thunkAPI.dispatch(getAllProductReviewsSuccess(result));
          //  console.log("Reviews: ", result);

      }catch(error){
           var errorMessage = (error as string);
           thunkAPI.dispatch(getAllProductReviewsFailed(errorMessage));
       }
});