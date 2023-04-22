import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { AuthReducer } from "./Auth/reducer";
import { BasketReducer } from "./Basket";
import { BillingReducer } from "./Billing";
import { ProductReducer } from "./Catalog";
import { ChatReducer } from "./Chat";
import { DiscountReducer } from "./Discount";
import { ProductReviewReducer } from './Review'
import { ShippingReducer } from "./shipping";

export const mainStore = configureStore({
    reducer :{
        Auth: AuthReducer,
        Product: ProductReducer,
        Basket: BasketReducer,
        ProductReview: ProductReviewReducer,
        Chat: ChatReducer,
        Billing: BillingReducer,
        shipping: ShippingReducer,
        Discount: DiscountReducer
    }
});

export type AppDispatch = typeof mainStore.dispatch;
export type RootState = ReturnType<typeof mainStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
