import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectShipping = (state : RootState) => state.shipping;
export const ShippingSelector = createSelector(selectShipping, state => state);
