import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

import MessageHeader from "./MessageHeader";

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px]  flex flex-col">
      <>
        {/* header */}
        <MessageHeader />
        <Messages />
        <MessageInput />
      </>
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl fornt-semibold flex flex-col"></div>
    </div>
  );
};
