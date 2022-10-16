import React, { useEffect } from "react"
import ActiveConversation from "./ActiveConversation"
import ChatProfile from "./ChatProfile";


interface Conversations{
  productId: any;
  userId: any;
}

const QuickChat: React.FC<Conversations> = (props) => {

    return (
        <>
        <div className="flex flex-col py-8 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-start justify-start h-12 w-full">
          {/* <div
            className="flex items-center justify-center rounded-2xl text-orange-600 bg-orange-100 h-10 w-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div> */}
          <div className="font-bold text-2xl">Chat Rooms</div>
        </div>
        <ChatProfile />
        <ActiveConversation roomChat={props.productId} userId={props.userId}/>
      </div>
        </>
    )
}

export default QuickChat;