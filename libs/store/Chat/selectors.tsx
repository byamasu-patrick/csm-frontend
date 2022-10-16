import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const selectChat = (state : RootState) => state.Chat;
export const ChatSelector = createSelector(selectChat, state => state);
