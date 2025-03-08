import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { jwtDecode } from "jwt-decode";

import { getMessages } from "../../api/messageService";
import { useSocket } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";

import notificationSound from "../../assets/sounds/notification.mp3";

const Messages = ({ activeGroup, messages, setMessages }) => {
  const messagesContainerRef = useRef(null);
  const { socket } = useSocket();
  const { authUser } = useAuthContext();

  useEffect(() => {
    fetchNewMessages();
  }, [activeGroup]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive-message", (newMessage) => {
      const sound = new Audio(notificationSound); //notification sound
      sound.play();
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket.off("receive-message");
  }, [socket]);

  useEffect(() => {}, [activeGroup]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          isCurrentUser={authUser.userId == message.userId}
        />
      ))}
    </div>
  );
};

export default Messages;
