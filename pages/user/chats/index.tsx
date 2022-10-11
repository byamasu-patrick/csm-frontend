import React, { useState } from "react";
import ChatMessages from "../../../components/widgets/chats/ChatMessages";
import QuickChat from "../../../components/widgets/chats/QuickChat";
import { NextPageWithLayout } from "../../_app";

const Chat: NextPageWithLayout = () => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
        <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-white">
            <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <QuickChat />
                <ChatMessages />
            </div>
            </div>
        </div>
        </>
    )
}

export default Chat;