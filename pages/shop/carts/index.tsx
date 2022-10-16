
import { ReactElement, useRef } from 'react';
import ShopLayout from '../../../components/layouts/shop-layout';
import type { NextPageWithLayout } from '../../_app';
import React, { Component, useEffect, useState } from "react";
import { HubConnectionBuilder } from '@microsoft/signalr';
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { MessageInfo } from '../../../components/widgets/chats/ChatForm';
import ChatMessages from '../../../components/widgets/chats/ChatMessages';
import QuickChat from '../../../components/widgets/chats/QuickChat';

const Carts: NextPageWithLayout = () => {
  
    const [ chat, setChat ] = useState<Array<MessageInfo>>([]);
    const latestChat = useRef(null);
    
    latestChat.current = chat;

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7121/hubs/chat')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);
                
                    setChat(updatedChat);
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);

    return (
        <>
          <div className="max-w-2xl py-6 mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">          
            
            <div className="w-full flex h-screen overflow-hidden flex items-center justify-center bg-white">
              <div className="flex h-screen antialiased text-gray-800">
                  <div className="bg-gray-50"></div>
                  <div className="flex flex-row h-full w-full overflow-x-hidden">
                      <QuickChat latestChat={latestChat} setChat={setChat} />
                      <ChatMessages chat={chat} latestChat={latestChat} setChat={setChat}/>
                      {/* <ChatData /> */}
                  </div>
              </div>
            </div>
          </div>
        </>
      );

}

Carts.getLayout = function getLayout(page: ReactElement){
    return <ShopLayout> { page } </ShopLayout>
}


export default Carts;

