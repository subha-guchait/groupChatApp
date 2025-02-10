import React from "react";

const MessageInput = () => {
  return (
    <div className="flex items-center p-4 bg-white-900">
      <input
        type="text"
        className="input input-bordered flex-grow mr-2"
        // value={input}
        placeholder="Type a message..."
        // onChange={(e) => setInput(e.target.value)}
        // onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <button className="btn btn-accent">Send</button>
    </div>
  );
};

export default MessageInput;
