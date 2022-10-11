import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectProductReview = (state : RootState) => state.ProductReview;
export const ProductReviewSelector = createSelector(selectProductReview, state => state);
