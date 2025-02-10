import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { jwtDecode } from "jwt-decode";

import { getMessages } from "../../api/messageService";

const Messages = ({ activeGroup }) => {
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    fetchNewMessages();
    const interval = setInterval(fetchNewMessages, 5000);
    return () => clearInterval(interval);
  }, [activeGroup]);

  useEffect(() => {}, [activeGroup]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getUserId = () => {
    const token = localStorage.getItem("token");
    const { userId } = jwtDecode(token);
    return userId;
  };

  const fetchNewMessages = async () => {
    const currentMessages =
      JSON.parse(localStorage.getItem(`group-messages-${activeGroup.id}`)) ||
      [];
    const lastMessageId =
      currentMessages.length > 0
        ? currentMessages[currentMessages.length - 1].id
        : null;

    const newMessages = await getMessages(activeGroup.id, lastMessageId);

    const updatedMessages = [...currentMessages, ...newMessages].slice(-10);

    setMessages(updatedMessages);

    localStorage.setItem(
      `group-messages-${activeGroup.id}`,
      JSON.stringify(updatedMessages)
    );
  };

  return (
    <div ref={messagesContainerRef} className="px-4 flex-1 overflow-auto">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          isCurrentUser={getUserId() === message.userId}
        />
      ))}
    </div>
  );
};

export default Messages;
