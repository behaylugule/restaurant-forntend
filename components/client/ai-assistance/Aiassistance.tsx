"use client";
import { useState, useRef, useEffect } from "react";

export default function AIAssistance() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");
  let socket: WebSocket | null = null;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      socket = new WebSocket("ws://localhost:8000/ws/chat-rag/");
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.delta) {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.role === "bot") {
              return [
                ...prev.slice(0, -1),
                { role: "bot", content: last.content + data.delta },
              ];
            }
            return [...prev, { role: "bot", content: data.delta }];
          });
        }
        if (data.done) console.log("Stream finished");
        if (data.sources) console.log("Sources:", data.sources);
      };
      socket.onopen = () => {
        socket!.send(JSON.stringify({ query: input }));
      };
    } else {
      socket.send(JSON.stringify({ query: input }));
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "bot", content: "" },
    ]);
    setInput("");
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100 z-50 rounded-2xl">
      {/* Header */}
      <div className="bg-[#C71F37] w-full rounded-t-xl text-white p-4 font-semibold text-lg shadow-md flex justify-between items-center">
        Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-md transition-all duration-200 ${
                m.role === "user"
                  ? "bg-[#C71F37] text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {m.content || (
                <span className="animate-pulse text-gray-400">Typing...</span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 border-t border-gray-200 shadow-inner">
        <div className="flex gap-2 max-w-lg mx-auto items-center">
          <input
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C71F37]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-[#C71F37] text-white p-3 rounded-full transition-transform transform hover:scale-110 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#C71F37]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
