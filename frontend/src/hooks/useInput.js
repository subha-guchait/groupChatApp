import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { sendMessage } from "../api/messageService";
import { uploadMediaInGroup } from "../api/mediaService";
import { useSocket } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

import sent_notification from "../assets/sounds/sent_notification.mp3";

const useInput = (activeGroup, setMessages, isMember, setIsMember) => {
  const [input, setInput] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get selected file

    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast.error("You can send images or videos only", {
        position: "bottom-center",
      });
      return;
    }

    setSelectedFile(file);

    setMediaPreview({
      type: file.type.startsWith("image/") ? "image" : "video",
      url: URL.createObjectURL(file),
    });
  };

  //remove media preview
  const removeMedia = () => {
    if (abortController) {
      abortController.abort(); // Abort ongoing upload
    }
    URL.revokeObjectURL(mediaPreview.url); //cleans up memory
    setSelectedFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle sending messages
  const handleSendMessage = async (e) => {
    try {
      e.preventDefault();
      if (!isMember || (!input.trim() && !selectedFile)) return; // Prevent sending if removed or empty message

      setUploading(true);
      let mediaUrl = null;

      if (selectedFile) {
        const controller = new AbortController();
        setAbortController(controller);

        try {
          mediaUrl = await uploadMediaInGroup(selectedFile, activeGroup.id, {
            signal: controller.signal,
          });
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Upload aborted");
            return;
          }
          throw error;
        }
      }

      const newMessage = {
        message: input,
        media: mediaUrl,
        userId: authUser.userId,
        userName: authUser.name,
        createdAt: new Date(),
      };

      // Send to api
      await sendMessage(activeGroup.id, input, mediaUrl);

      // Update UI instantly
      setMessages((prev) => [...prev, newMessage]);

      // Emit message via socket
      socket.emit("send-message", {
        groupId: activeGroup.id,
        ...newMessage,
      });
      const sound = new Audio(sent_notification); //notification sound
      sound.play();

      setInput("");
      setSelectedFile(null);
      setMediaPreview(null);
    } catch (err) {
      console.log(err);
      toast.error(err.message || "something went wrong");
    } finally {
      setUploading(false);
      setAbortController(null);
    }
  };

  return {
    input,
    setInput,
    mediaPreview,
    handleImageChange,
    handleSendMessage,
    removeMedia,
    uploading,
    fileInputRef,
  };
};

export default useInput;
