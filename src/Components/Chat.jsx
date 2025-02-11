import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const PAGE_ID = "12345";
// const VISITOR_ID = "679a5471100d48d7d6a32c05";
const VISITOR_ID = '652ac14c4b076f4e1ea3e2ea'

const socket = io("http://116.202.210.102:5005/chat", {
  transports: ["websocket", "polling"],
  query: {
    page_id: PAGE_ID,
    visitor_id: VISITOR_ID,
  },
});

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to WebSocket");
  //     socket.emit("connect_chat", { session_id: "abc" });
  //   });

  //   socket.on("message_response", (data) => {
  //     console.log("data in message_response", data); 
  //     setMessages((prev) => [...prev, { sender: "AI", text: data.response }]);
  //   });

  //   socket.on("rate_limit_exceeded", (data) => {
  //     console.log("data in rate_limit_exceeded", data);
  //     alert(data.error);
  //   });

  //   return () => {
  //     socket.off("message_response");
  //     socket.off("rate_limit_exceeded");
  //   };
  // }, []);


  useEffect(() => {
    socket.on("message_response", (data) => {
      console.log("data in message_response", data);
  
      // Check if the last message is from AI, and append instead of creating a new message
      setMessages((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].sender === "AI") {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].text += " " + data.response;
          return updatedMessages;
        } else {
          return [...prev, { sender: "AI", text: data.response }];
        }
      });
    });
  
    return () => {
      socket.off("message_response");
    };
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "You", text: input }]);
      socket.emit("message", { message: input });
      setInput("");
    }
  };
console.log(messages,"=========messages");

  return (
    <div className="chat-container flex flex-col h-screen max-w-sm mx-auto p-4 bg-gray-100">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2 text-sm rounded-lg shadow-md 
              ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md outline-none"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
          onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
