import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { AuthReducer } from "./Auth/reducer";
import { ProductReducer } from "./Catalog";


export const mainStore = configureStore({
    reducer :{
        Auth: AuthReducer,
        Product: ProductReducer
    }
});

export type AppDispatch = typeof mainStore.dispatch;
export type RootState = ReturnType<typeof mainStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
