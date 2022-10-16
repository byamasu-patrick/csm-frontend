import React, { useState, ReactElement, useEffect, useRef} from "react";
import ClientLayout from "../../../components/layouts/clients-layout";
import ChatMessages from "../../../components/widgets/chats/ChatMessages";
import { HubConnectionBuilder } from '@microsoft/signalr';
import QuickChat from "../../../components/widgets/chats/QuickChat";
import { NextPageWithLayout } from "../../_app";
import { MessageInfo } from "../../../components/widgets/chats/ChatForm";
import { useRouter } from "next/router";

const Chat: NextPageWithLayout = () => {
    // const [show, setShow] = useState<boolean>(false);
    const [ chat, setChat ] = useState<Array<MessageInfo>>([]);
    const latestChat = useRef(null);
    const router = useRouter()
    const { productId, shopId } = router.query
    
    // latestChat.current = chat;

    // useEffect(() => {
    //     const connection = new HubConnectionBuilder()
    //         .withUrl('https://localhost:7121/hubs/chat')
    //         .withAutomaticReconnect()
    //         .build();

    //     connection.start()
    //         .then(result => {
    //             console.log('Connected!');

    //             connection.on('ReceiveMessage', message => {
    //                 const updatedChat = [...latestChat.current];
    //                 updatedChat.push(message);
                
    //                 setChat(updatedChat);
    //             });
    //         })
    //         .catch(e => console.log('Connection failed: ', e));
    // }, []);

    return (
        <>
        <div className="w-full flex h-screen overflow-hidden flex items-center justify-center bg-white">
            <div className="flex h-screen antialiased text-gray-800">
                <div className="bg-gray-50"></div>
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <QuickChat productId={productId} userId={shopId} />
                    <ChatMessages chat={chat} latestChat={latestChat} setChat={setChat}/>
                    {/* <ChatData /> */}
                </div>
            </div>
        </div>
        </>
    )
}

Chat.getLayout = function getLayout(page: ReactElement){
    return <ClientLayout> { page } </ClientLayout>
}


export default Chat;