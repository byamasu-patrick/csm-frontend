import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { JoinModel, Message, ResponseConnection, UserConnection } from "../../models/chat/ChatModel";
import { CreateReviewDto, ProductReviewModel, ProductReviewResponse } from "../../models/reviews/ReviewModels";
import { JoinChatRoom, SendMessage } from "../../services/ChatService/ChatService";
import { AddProductReview, GetProductReviews } from "../../services/ReviewService/ReviewService";
import { ChatActionType } from "./actions-type";

// add chat message to room
export const addingChatMessage  = createAction<boolean>(ChatActionType.ADD_CHAT_MESSAGE);
export const addChatMessageSuccess = createAction<string>(ChatActionType.ADD_CHAT_MESSAGE_SUCCESS);
export const getMessagesSuccess = createAction<ResponseConnection>(ChatActionType.GET_CHAT_MESSAGES);
export const addChatMessageFailed = createAction<string>(ChatActionType.ADD_CHAT_MESSAGE_FAILED);
// join chat room
export const joiningChatRoom  = createAction<boolean>(ChatActionType.JOIN_CHAT_ROOM);
export const joinChatRooomSuccess = createAction<ResponseConnection>(ChatActionType.JOIN_CHAT_ROOM_SUCCESS)
export const joinChatRooomFailed = createAction<string>(ChatActionType.JOIN_CHAT_ROOM_FAILED);

export const JoinChatRoomToWebSocket = createAsyncThunk(ChatActionType.JOIN_CHAT_ROOM,
    async(joinChatRoomModel : UserConnection , thunkAPI) =>{
      try{

          thunkAPI.dispatch(joiningChatRoom(true));
          let result: ResponseConnection = await JoinChatRoom(joinChatRoomModel);
          thunkAPI.dispatch(joinChatRooomSuccess({messages: result.messages, joinedMessages: result.joinedMessages, connectedUsers: result.connectedUsers}));

          return result;

       }catch(e){
           var erroMessage = (e as string);
           thunkAPI.dispatch(joinChatRooomFailed(erroMessage));
      }
});


export const SendChatMessageToRoom = createAsyncThunk(ChatActionType.ADD_CHAT_MESSAGE, 
  async(chatMessage: string, thunkAPI) =>{
      try{

           thunkAPI.dispatch(addingChatMessage(true));

           await SendMessage(chatMessage);

           thunkAPI.dispatch(addChatMessageSuccess("Message has been sent"));
          //  console.log("Reviews: ", result);

      }catch(error){
           var errorMessage = (error as string);
           thunkAPI.dispatch(addChatMessageFailed(errorMessage));
       }
});

export const GetChatMessageToRoom  = createAsyncThunk(ChatActionType.GET_CHAT_MESSAGES, 
  async(chatMessage: ResponseConnection, thunkAPI) =>{
      try{


           thunkAPI.dispatch(getMessagesSuccess(chatMessage));
          //  console.log("Reviews: ", result);

      }catch(error){
           var errorMessage = (error as string);
          //  thunkAPI.dispatch(addChatMessageFailed(errorMessage));
       }
});