import React from "react";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [input, setInput] = useState({
    message: "",
  });

  const sendMessage = async () => {
    try {
      const newMessage = await axios.post("/api/message/sendmessage", input, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setInput({ message: "" });

      console.log(newMessage);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white w-screen mx-auto">
      <h1 className="text-center text-2xl font-bold p-4">Chat App</h1>
      <div className="flex-grow overflow-auto p-4 space-y-2">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>
      <div className="flex items-center p-4 bg-white-900">
        <input
          type="text"
          className="input input-bordered flex-grow mr-2"
          value={input.message}
          placeholder="Type a message..."
          onChange={(e) => setInput({ ...input, message: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Home;
