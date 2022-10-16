import React, {useState, useRef, useEffect} from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ChatForm, { MessageInfo } from './ChatForm';
import { AuthSelector } from '../../../libs/store/Auth';
import { ProductSelector } from '../../../libs/store/Catalog';
import { useAppDispatch, useAppSelector } from '../../../libs/store';
import { ChatSelector, GetChatMessageToRoom, joinChatRooomSuccess } from '../../../libs/store/Chat';
import { joinRoomResponses, state } from '../../../libs/services/ChatService/ChatService';

interface Conversations{
    setChat: any;
    latestChat: any;
    chat: Array<MessageInfo>;
}  

const ChatDisplay: React.FC<Conversations> = (props) => {
    
    const { user } = useAppSelector(AuthSelector);
    const { joinRoomResponse  } = useAppSelector(ChatSelector);
    const dispatch = useAppDispatch();

    let username = user?.profile?.firstName +" "+ user?.profile.lastName;
    // console.log("Data from the room: ", joinRoomResponse)
    useEffect(() => {

        const getMssage = async () => {           
            await dispatch(joinChatRooomSuccess(joinRoomResponses));        
            console.log("Watched variables: ", joinRoomResponse);
        }

        getMssage().catch(error => console.log(error));
        // console.log("Data from the room: ", joinRoomResponse)

    }, [joinRoomResponses.messages, joinRoomResponses.joinedMessages, joinRoomResponses.connectedUsers, state]);

    return (
        <>
             <div className="relative flex items-center space-x-4">
                <div className="relative">
                    <span className="absolute text-green-500 -right-2 bottom-0">
                        <svg width="20" height="20">
                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                        </svg>
                    </span>
                    <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-10 sm:w-12 h-8 sm:h-12 rounded-full" />
                </div>
                <div className="flex flex-col leading-tight">
                    <div className="text-lg mt-1 flex items-center">
                        <span className="text-gray-700 mr-3">{user?.profile?.firstName +" "+ user?.profile?.lastName}</span>
                    </div>
                    <span className="text-sm text-gray-600">Junior Developer</span>
                </div>
            </div>
            <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                <div className="w-full">
                    {
                        // joinRoomResponse.messages.length > 0 ? (
                            joinRoomResponse.messages.map((data) => {
                                // console.log("Data from the Team: ", data);
                                if(data !== undefined){
                                    if(data.user.name === username){                                    
                                        return (  
                                            
                                            <div className="w-full col-start-6 col-end-13 p-3 rounded-lg">
                                                <div className="flex items-center justify-start flex-row-reverse">
                                                    <div
                                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 flex-shrink-0"
                                                    >
                                                    { data.user.name[0].toLocaleUpperCase() }
                                                    </div>
                                                    <div
                                                    className="relative mr-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                    >
                                                    <div>
                                                        { data.message }
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>                   
                                        )
                                    }
                                    else{                                    
                                        return (                                            
                                            <div className="w-full col-start-6 col-end-13 p-3 rounded-lg">
                                                <div className="flex items-center justify-start flex-row ">
                                                    <div
                                                    className="flex items-center mr-4 justify-center h-10 w-10 rounded-full bg-orange-100 flex-shrink-0"
                                                    >
                                                    { data.user.name[0].toLocaleUpperCase() }
                                                    </div>
                                                    <div
                                                    className="relative mr-3 text-sm bg-gray-100 py-2 px-4 shadow rounded-xl"
                                                    >
                                                    <div>{ data.message } </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                }
                            })
                        // ) : (<></>)
                    }
                </div>
                </div>
            </div>            
            <ChatForm data={props.chat}/>
        </>
    )
}

export default ChatDisplay;