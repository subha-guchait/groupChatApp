import React from "react";
import { useState } from "react";

import useChat from "../../hooks/useChat";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden">
      <Sidebar activeGroup={activeGroup} setActiveGroup={setActiveGroup} />

      <MessageContainer activeGroup={activeGroup} />
    </div>
  );
};

// const Home = () => {
//   const [input, setInput] = useState("");
//   const { messages, addMessage, userId } = useChat();

//   // Create a ref for scrolling to the bottom of the chat
//   const chatEndRef = useRef(null);

//   // Auto-scroll to the latest message when messages update
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen bg-white w-screen mx-auto">
//       <h1 className="text-center text-2xl font-bold p-4">Chat App</h1>
//       <div ref={chatEndRef} className="flex-grow overflow-auto p-4 space-y-2">
//         {messages.map((message) => (
//           <ChatBubble
//             key={message.id}
//             message={message}
//             isCurrentUser={userId === message.userId}
//           />
//         ))}
//       </div>
//       <ChatInput
//         input={input}
//         setInput={setInput}
//         onSend={() => {
//           addMessage(input);
//           setInput("");
//         }}
//       />
//     </div>
//   );
// };

export default Home;
