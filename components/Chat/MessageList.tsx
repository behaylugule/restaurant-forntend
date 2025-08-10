import { usePagination } from "@/hook/usePagination";
import { timeAgo } from "@/lib/utils";
import { ChatRoomType, MessageType } from "@/type/message.model";
import { MESSAGE_SENDER } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../AuthContext";
import { chatService } from "@/lib/services/chatService";
import { MessageCircleCode } from "lucide-react";
import { text } from "stream/consumers";

interface PropsTypes {
  chatRoomDetail?: ChatRoomType;
}
export default function MessageList({ chatRoomDetail }: PropsTypes) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const pagination = usePagination();
  const { user } = useAuth();

  //   const accessToken = localStorage.getItem("access");
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!chatRoomDetail?.id) return;

    const accessToken = localStorage.getItem("access");
    socketRef.current = new WebSocket(
      `ws://localhost:8000/ws/chat/${chatRoomDetail.id}/?token=${accessToken}`,
    );

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      data.create_date = Date.now();
      setMessages((prev) => [...prev, data]);
      setInput("");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [chatRoomDetail?.id]);

  const sendMessage = () => {
    if (!socketRef.current) return;
    if (input.trim() && socketRef.current.readyState == WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          sender: MESSAGE_SENDER.SYSTEM,
          username: user.username,
          text: input,
        }),
      );
    }
  };

  const getMessages = () => {
    if (!chatRoomDetail?.shop) return;

    chatService
      .getMessages({
        page: pagination.page,
        search: pagination.search,
        page_size: 100,
        room_id: chatRoomDetail.id,
      })
      .then((res) => {
        setMessages(res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMessages();
  }, [pagination.page, chatRoomDetail?.id]);

  return (
    <div className="relative min-h-96 max-h-[80vh]">
      {chatRoomDetail?.id ? (
        <>
          <div className="absolute top-0 w-full py-3 border-b-2 border-gray-300 bg-white text-center font-medium text-[20px]">
            <h1>{chatRoomDetail?.client_name}</h1>
          </div>
          <div className="overflow-y-scroll  border p-4 rounded bg-gray-100 mb-4 py-16  h-[70vh]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === "You" ? "text-right" : "text-left"}
              >
                <div
                  className={`flex flex-col  px-3 py-2  rounded  shadow mb-2 ${
                    msg.sender == MESSAGE_SENDER.SYSTEM
                      ? "items-end bg-[#C71F37]/10"
                      : "items-start"
                  }`}
                >
                  <span
                    className={`font-normal text-[16px] ${
                      msg.sender == MESSAGE_SENDER.SYSTEM
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {msg.text}
                  </span>
                  <span
                    className={`font-normal text-gray-400 ${
                      msg.sender == MESSAGE_SENDER.SYSTEM
                        ? "text-left"
                        : "text-right"
                    }`}
                  >
                    {timeAgo(msg.create_date || "")}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 flex gap-2 w-full">
            <input
              className="flex-1 border-2 p-2 py-4 rounded border-[#C71F37] bg-white outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-[#C71F37] text-white px-4 rounded"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
            <MessageCircleCode />
          </div>
          <div className="w-full text-center ">
            <h1 className="text-[20px] font-medium text-gray-700 mb-3">
              Select a conversation
            </h1>
            <p className="text-[14px] font-normal text-gray-700">
              Choose a user from the list to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
