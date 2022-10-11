import { createReducer } from "@reduxjs/toolkit";
import { ProductReviewModel, ProductReviewResponse } from "../../models/reviews/ReviewModels";
import { addingProductReview, addProductReviewFailed, addProductReviewSuccess } from "./actions";

export type ReviewState = {
    reviewsResponse : ProductReviewResponse,
    error : string  | null,
    isAdding : boolean,
    isEditing : boolean,
    isGetting : boolean,
    successMessage : string,
    warningMessage : string,
    review : ProductReviewModel | null
 };

 const initialState: ReviewState = {
    reviewsResponse : {
        currentPage: 0,
        results: [],
        totalPages: 0
    },
    error : null,
    isAdding : false,
    isEditing : false,
    isGetting : false,
    successMessage : '',
    warningMessage : '',
    review : null
 }

 export const ProductReviewReducer = createReducer(initialState, (builder) => {   

    builder.addCase(addingProductReview , (state, {payload}) =>{
        return {...state, isAdding : payload , warningMessage : ''}
    });
    
    builder.addCase(addProductReviewSuccess , (state, {payload}) =>{
        return {
            ...state, 
            review : payload, 
            isAdding: false,
            successMessage: 'Review successfully added!',
            warningMessage : ''
        }
    });
    
    builder.addCase(addProductReviewFailed , (state, {payload}) =>{
        return {
            ...state, 
            isAdding: false,
            error: payload
        }
    });
 });