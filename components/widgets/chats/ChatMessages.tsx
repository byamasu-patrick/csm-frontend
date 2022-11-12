import React, { useState } from "react";
import ChatDisplay from "./ChatDisplay";
import ChatForm, { MessageInfo } from "./ChatForm";



export interface Conversations{
    setChat: any;
    latestChat: any;
    chat: Array<MessageInfo>;
}
  


const ChatMessages: React.FC<Conversations> = (props) => {
    return (
        <>
        <div className="flex flex-col flex-auto h-full p-6">
            <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-50 h-full p-4"
            >
                <ChatDisplay chat={props.chat} latestChat={props.latestChat} setChat={props.setChat}/>
            </div>
        </div>
        </>
    )
}

export default ChatMessages;