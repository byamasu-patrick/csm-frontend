import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAuth = (state : RootState) => state.Auth;
export const AuthSelector = createSelector(selectAuth, state => state);
