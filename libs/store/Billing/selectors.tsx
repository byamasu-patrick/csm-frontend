import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectBilling = (state : RootState) => state.Billing;
export const BillingSelector = createSelector(selectBilling, state => state);
