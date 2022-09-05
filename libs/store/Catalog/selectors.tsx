import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectProduct = (state : RootState) => state.Product;
export const ProductSelector = createSelector(selectProduct, state => state);
