import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../libs/store';
import { AuthSelector } from '../../../libs/store/Auth';
import { SendChatMessageToRoom } from '../../../libs/store/Chat';

export interface MessageInfo{
    user: string;
    message: string;
}

export interface ChatData {
    data: Array<MessageInfo>;
}

const ChatForm: React.FC<ChatData> = (props) => {

    const [message, setMessage] = useState<string>('');
    const { user } = useAppSelector(AuthSelector);
    const dispatch = useAppDispatch();
    
    const sendMessage = async () => {
        try {
            if(message !== ""){                
                dispatch(SendChatMessageToRoom(
                    message
                ));                             
                setMessage('');
            }
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }

    return (
        <>
        <div
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div>
                <button
                    className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                    </svg>
                </button>
            </div>
            <div className="flex-grow ml-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-orange-300 pl-4 h-10"
                        placeholder="Write your message here"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                </div>
            </div>
            <div className="ml-4">
            <button
                onClick={() => sendMessage()}
                className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                <span className="mr-2">
                <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                </svg>
                </span>
                <span>Send</span>
            </button>
            </div>
        </div>
        </>
    )
}

export default ChatForm;