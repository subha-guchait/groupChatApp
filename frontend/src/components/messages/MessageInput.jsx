import React, { useState, useEffect } from "react";
import useInput from "../../hooks/useInput";

const MessageInput = ({ activeGroup, setMessages, isMember, setIsMember }) => {
  const { input, setInput, handleSendMessage } = useInput(
    activeGroup,
    setMessages,
    isMember,
    setIsMember
  );

  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex items-center p-4 bg-white-900">
        <input
          type="text"
          className="input input-bordered flex-grow mr-2"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          disabled={!isMember} // Disable input if removed
        />
        <button className="btn btn-accent" disabled={!isMember}>
          Send
        </button>
      </div>
      {!isMember && (
        <div className="text-red-500 text-center mt-2">
          You are no longer a participant of this group.
        </div>
      )}
    </form>
  );
};

export default MessageInput;
