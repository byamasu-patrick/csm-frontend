import React from "react";
import ActiveConversation from "./ActiveConversation";
import ChatProfile from "./ChatProfile";

interface Conversations {
  productId: any;
  userId: any;
}

const QuickChat: React.FC<Conversations> = (props) => {
  return (
    <>
      <div className="flex flex-col py-8 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-start justify-start h-12 w-full">
          <div className="font-bold text-2xl">Chat Rooms</div>
        </div>
        <ChatProfile />
        <ActiveConversation roomChat={props.productId} userId={props.userId} />
      </div>
    </>
  );
};

export default QuickChat;
