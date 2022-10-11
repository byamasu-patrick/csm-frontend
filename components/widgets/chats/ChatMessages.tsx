import React, { useState } from "react";
import ChatDisplay from "./ChatDisplay";
import ChatForm from "./ChatForm";

const ChatMessages: React.FC = () => {
    return (
        <>
        <div className="flex flex-col flex-auto h-full p-6">
            <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-50 h-full p-4"
            >
            <ChatDisplay />
            <ChatForm />
            </div>
        </div>
        </>
    )
}

export default ChatMessages;