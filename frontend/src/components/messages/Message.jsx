import React, { useEffect } from "react";

const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div className="chat-header">{message.userName}</div>
      <div
        className={`chat-bubble ${
          isCurrentUser ? "chat-bubble-primary" : "chat-bubble-secondary"
        }`}
      >
        {message.message}
      </div>
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
