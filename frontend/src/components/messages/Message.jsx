import React from "react";

const Message = ({ message, isCurrentUser }) => {
  // Function to check if media is an image or a video
  const isImage = (url) =>
    url?.includes(".jpeg") ||
    url?.includes(".jpg") ||
    url?.includes(".png") ||
    url?.includes(".gif") ||
    url?.includes(".webp");

  const isVideo = (url) =>
    url?.includes(".mp4") || url?.includes(".webm") || url?.includes(".ogg");

  return (
    <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>

      {/* User Name */}
      <div className="chat-header">{message.userName}</div>

      {/* Message Bubble */}
      <div
        className={`chat-bubble ${
          isCurrentUser ? "chat-bubble-primary" : "chat-bubble-secondary"
        }`}
      >
        {/* Display text message if available */}
        {message.message && <p>{message.message}</p>}

        {/* Display media if available */}
        {message.media && isImage(message.media) && (
          <img
            src={message.media}
            alt="Image"
            className="rounded-lg max-w-xs mt-2 cursor-pointer"
            onClick={() => window.open(message.media, "_blank")}
          />
        )}

        {message.media && isVideo(message.media) && (
          <video
            src={message.media}
            alt="video"
            controls
            className="rounded-lg max-w-xs mt-2 cursor-pointer"
          />
        )}
      </div>

      {/* Timestamp */}
      <div className="chat-footer opacity-50">
        <time className="text-xs opacity-50">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
    </div>
  );
};

export default Message;
