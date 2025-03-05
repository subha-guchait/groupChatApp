import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sendMessage } from "../api/messageService";
import { useSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const useInput = (activeGroup, setMessages, isMember, setIsMember) => {
  const [input, setInput] = useState("");

  const { socket } = useSocket();
  const { authUser } = useAuthContext();

  // Listen for 'removed-from-group' event
  useEffect(() => {
    if (!socket || !activeGroup) return;

    const handleRemovedFromGroup = ({ groupId }) => {
      if (groupId === activeGroup.id) {
        setIsMember(false);
      }
    };

    const handleAddedToGroup = ({ groupId }) => {
      if (groupId === activeGroup.id) {
        setIsMember(true); // User re-added
      }
    };

    socket.on("removed-from-group", handleRemovedFromGroup);
    socket.on("added-group", handleAddedToGroup);

    return () => {
      socket.off("removed-from-group", handleRemovedFromGroup);
    };
  }, [socket, activeGroup]);

  // Handle sending messages
  const handleSendMessage = async (e) => {
    try {
      e.preventDefault();
      if (!isMember || !input.trim()) return; // Prevent sending if removed or empty message

      const newMessage = {
        message: input,
        userId: authUser.userId,
        userName: authUser.name,
        createdAt: new Date(),
      };

      // Send to api
      await sendMessage(activeGroup.id, input);

      // Update UI instantly
      setMessages((prev) => [...prev, newMessage]);

      // Emit message via socket
      socket.emit("send-message", {
        groupId: activeGroup.id,
        ...newMessage,
      });

      setInput("");
    } catch (err) {
      console.log(err);
      if (err) {
        toast.error(err.message || "something went wrong");
      }
    }
  };

  return {
    input,
    setInput,
    handleSendMessage,
  };
};

export default useInput;
