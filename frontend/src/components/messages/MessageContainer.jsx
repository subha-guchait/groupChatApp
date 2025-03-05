import React, { useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = ({ activeGroup }) => {
  const [messages, setMessages] = useState([]);
  const [isMember, setIsMember] = useState(true);
  return (
    <div className="md:min-w-[450px]  flex flex-col">
      {!activeGroup ? (
        <NoChatSelected />
      ) : (
        <>
          {/* header */}
          <MessageHeader activeGroup={activeGroup} setIsMember={setIsMember} />
          <Messages
            activeGroup={activeGroup}
            messages={messages}
            setMessages={setMessages}
          />
          <MessageInput
            activeGroup={activeGroup}
            setMessages={setMessages}
            isMember={isMember}
            setIsMember={setIsMember}
          />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-800">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-100 font-semibold flex flex-col items-center gap-2">
        <p>
          Welcome 👋 <span className="text-blue-400">{authUser.name}</span> ❄
        </p>
        <p className="text-gray-300">Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center text-blue-400" />
      </div>
    </div>
  );
};
