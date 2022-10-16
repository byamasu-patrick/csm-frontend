import { createReducer } from "@reduxjs/toolkit";
import { ResponseConnection, UserConnection } from "../../models/chat/ChatModel";
import { ProductReviewModel, ProductReviewResponse } from "../../models/reviews/ReviewModels";
import { addChatMessageFailed, addChatMessageSuccess, addingChatMessage, joinChatRooomFailed, joinChatRooomSuccess, joiningChatRoom } from "./actions";

export type ChatState = {
    joinRoomResponse : ResponseConnection,
    error : string  | null,
    isAdding : boolean,
    isEditing : boolean,
    isJoining : boolean,
    successMessage : string,
    warningMessage : string,
    chatMessages : UserConnection[]
 };

 const initialState: ChatState = {
    joinRoomResponse : {
        connectedUsers: [],
        messages: [],
        joinedMessages: []
    },
    error : null,
    isAdding : false,
    isEditing : false,
    isJoining : false,
    successMessage : '',
    warningMessage : '',
    chatMessages : []
 }

 export const ChatReducer = createReducer(initialState, (builder) => {   

    builder.addCase(joiningChatRoom , (state, {payload}) =>{
        return {...state, isJoining : payload , warningMessage : ''}
    });
    
    builder.addCase(joinChatRooomSuccess , (state, {payload}) =>{
        return {
            ...state, 
            joinRoomResponse : {
                messages: [...state.joinRoomResponse.messages, payload.messages[payload.messages.length - 1]],
                connectedUsers: [...state.joinRoomResponse.connectedUsers, payload.connectedUsers[payload.connectedUsers.length -1]],
                joinedMessages: [...state.joinRoomResponse.joinedMessages, payload.joinedMessages[payload.joinedMessages.length -1]],
            }, 
            isJoining: false,
            successMessage: 'User joined the chat',
            warningMessage : ''
        }
    });
    
    builder.addCase(joinChatRooomFailed , (state, {payload}) =>{
        return {
            ...state, 
            isJoining: false,
            error: payload
        }
    });  
    
    builder.addCase(addingChatMessage , (state, {payload}) =>{
        return {...state, isAdding : payload , warningMessage : ''}
    });
    
    builder.addCase(addChatMessageSuccess , (state, {payload}) =>{
        return {
            ...state, 
            isAdding: false,
            successMessage: payload,
            warningMessage : ''
        }
    });
    
    builder.addCase(addChatMessageFailed , (state, {payload}) =>{
        return {
            ...state, 
            isAdding: false,
            error: payload
        }
    });  

 });