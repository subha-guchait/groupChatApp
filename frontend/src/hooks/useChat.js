import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getMessages, sendMessage } from "../services/messageService";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { userId } = jwtDecode(token);
      setUserId(userId);
    }

    //load messages from localStorage
    const savedMessages =
      JSON.parse(localStorage.getItem("chat-messages")) || [];

    setMessages(savedMessages);

    const fetchNewMessages = async () => {
      const currentMessages =
        JSON.parse(localStorage.getItem("chat-messages")) || [];
      const lastMessageId =
        currentMessages.length > 0
          ? currentMessages[currentMessages.length - 1].id
          : null;

      const newMessages = await getMessages(lastMessageId);

      const updatedMessages = [...currentMessages, ...newMessages].slice(-10);

      setMessages(updatedMessages);
      localStorage.setItem("chat-messages", JSON.stringify(updatedMessages));
    };

    fetchNewMessages();

    // Set up an interval to fetch messages every second (1000ms)
    const interval = setInterval(fetchNewMessages, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const addMessage = async (message) => {
    const newMessage = await sendMessage(message);
    if (newMessage) {
      const updatedMessages = [...messages, newMessage].slice(-10);

      setMessages(updatedMessages);
      localStorage.setItem("chat-messages", JSON.stringify(updatedMessages));
    }
  };

  return { messages, addMessage, userId };
};

export default useChat;
