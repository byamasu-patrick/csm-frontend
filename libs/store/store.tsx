import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { AuthReducer } from "./Auth/reducer";
import { BasketReducer } from "./Basket";
import { ProductReducer } from "./Catalog";
import { ProductReviewReducer } from './Review'

export const mainStore = configureStore({
    reducer :{
        Auth: AuthReducer,
        Product: ProductReducer,
        Basket: BasketReducer,
        ProductReview: ProductReviewReducer
    }
});

export type AppDispatch = typeof mainStore.dispatch;
export type RootState = ReturnType<typeof mainStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
