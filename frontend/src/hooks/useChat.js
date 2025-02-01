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

    const fetchMessages = async () => {
      const data = await getMessages();
      setMessages(data);
    };

    fetchMessages();

    // Set up an interval to fetch messages every second (1000ms)
    const interval = setInterval(fetchMessages, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const addMessage = async (message) => {
    const newMessage = await sendMessage(message);
    if (newMessage) setMessages([...messages, newMessage]);
  };

  return { messages, addMessage, userId };
};

export default useChat;
