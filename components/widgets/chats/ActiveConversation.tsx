import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import ArchivedConversation from './ArchivedConversation';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useAppDispatch, useAppSelector } from '../../../libs/store';
import { ChatSelector, JoinChatRoomToWebSocket } from '../../../libs/store/Chat';
import { AuthSelector } from '../../../libs/store/Auth';
import { User } from '../../../libs/models/auth/AuthModels';

export interface Conversations{
  roomChat: string;
  userId: string;
}

const ActiveConversation: React.FC<Conversations> = (props) => {
  const { isJoining, joinRoomResponse } = useAppSelector(ChatSelector);
  const { user } = useAppSelector(AuthSelector);
  const [isOrdersFetched, setIsOrdersFetched] = useState<boolean>(false);
  const dispatch = useAppDispatch();

    const [shops, setShops] = useState(Array<any>);

    useEffect(() => {
        const getChops = async () => {
          const result = await axios.get("http://localhost:5011/api/v1/Auth/GetShops/true");
          setShops(result.data);
        }
        getChops().catch((error) => console.log("No shops fetched"));
    }, []);

    const openRoom = async (shopName: string) => {
      await dispatch(JoinChatRoomToWebSocket({
        user: {
          email: user?.email,
          name: user?.profile?.firstName +" "+ user?.profile?.lastName,
          userId: user?.id.toString()
        },
        room: props.roomChat +"-"+ props.userId        
      }));
    }

    // console.log("Messages: ", joinRoomResponse);

    return (
        <>
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span 
                className="font-bold"
                >Active Conversations</span>
            <span
              className="
                flex 
                items-center 
                justify-center 
                bg-gray-300 
                h-4 w-4 
                rounded-full"
              >4</span>
          </div>

            {
              shops.length > 0 ? (
                shops.map((data, index) => {
                  return (                    
                    <div 
                      key={index}
                      className="
                          flex 
                          flex-col 
                          space-y-1 
                          mt-4 
                          h-48 
                          overflow-y-auto">
                      <button
                        onClick={() => openRoom(data.displayName)}
                        className="
                          flex 
                          flex-row 
                          items-center 
                          hover:bg-gray-100 
                          rounded-xl p-2
                          focus:bg-gray-100 "
                      >
                        <div
                          className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                        >
                          {data.displayName[0].toLocaleUpperCase()}
                        </div>
                        <div className="ml-2 text-sm font-semibold">{data.displayName}</div>
                      </button>
                    </div>
                  )
                })
              ) : (<></>)
            }
          {/* <ArchivedConversation /> */}
        </div>
        </>
    )
}


export default ActiveConversation;