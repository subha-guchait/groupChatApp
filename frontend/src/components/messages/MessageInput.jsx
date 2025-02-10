import React, { useState } from "react";
import { sendMessage } from "../../api/messageService";

const MessageInput = ({ activeGroup }) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendMessage(activeGroup.id, input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center p-4 bg-white-900">
        <input
          type="text"
          className="input input-bordered flex-grow mr-2"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          // onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button className="btn btn-accent">Send</button>
      </div>
    </form>
  );
};

export default MessageInput;
