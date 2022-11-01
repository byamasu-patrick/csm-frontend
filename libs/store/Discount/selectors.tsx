import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectDiscount = (state : RootState) => state.Discount;
export const DiscountSelector = createSelector(selectDiscount, state => state);
