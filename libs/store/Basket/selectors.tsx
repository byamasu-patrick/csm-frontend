import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectBasket = (state : RootState) => state.Basket;
export const BasketSelector = createSelector(selectBasket, state => state);
