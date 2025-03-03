import React, { useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

import MessageHeader from "./MessageHeader";

const MessageContainer = ({ activeGroup }) => {
  const [messages, setMessages] = useState([]);
  return (
    <div className="md:min-w-[450px]  flex flex-col">
      <>
        {/* header */}
        <MessageHeader activeGroup={activeGroup} />
        <Messages
          activeGroup={activeGroup}
          messages={messages}
          setMessages={setMessages}
        />
        <MessageInput activeGroup={activeGroup} setMessages={setMessages} />
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
