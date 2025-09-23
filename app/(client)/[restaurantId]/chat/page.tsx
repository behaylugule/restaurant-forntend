"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChatRoomType, MessageType } from "@/type/message.model";
import { chatService } from "@/lib/services/chatService";
import { usePagination } from "@/hook/usePagination";
import { shopService } from "@/lib/services/shopsService";
import { ShopType } from "@/type/shops.model";
import { useAuth } from "@/components/AuthContext";
import { MESSAGE_SENDER } from "@/utils/utils";
import { timeAgo } from "@/lib/utils";

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = params.restaurantId;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const pagination = usePagination();
  const [shopDetail, setShopDetail] = useState<ShopType>();
  const [chatRoomDetail, setChatRoomDetail] = useState<ChatRoomType>();
  const { user } = useAuth();

  //   const accessToken = localStorage.getItem("access");
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!chatRoomDetail?.id) return;

    const accessToken = localStorage.getItem("access");
    socketRef.current = new WebSocket(
      `ws://localhost:8000/ws/chat/${chatRoomDetail.id}/?token=${accessToken}`,
    );

    console.log(socketRef.current);
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      data.create_date = Date.now();
      setMessages((prev) => [...prev, data]);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [chatRoomDetail]);

  const sendMessage = () => {
    console.log(socketRef.current);
    if (!socketRef.current) return;
    if (input.trim() && socketRef.current.readyState == WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          sender: MESSAGE_SENDER.USER,
          username: user.username,
          text: input,
        }),
      );
      //   setMessages((prev) => [
      //     ...prev,
      //     { sender: MESSAGE_SENDER.USER, username: user.username, text: input },
      //   ]);
    }
  };

  const getMessages = () => {
    if (!chatRoomDetail?.id) return;

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

  const getShop = () => {
    if (!roomId) return;
    shopService
      .getShop(roomId.toLocaleString())
      .then((res) => {
        setShopDetail(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getMessages();
  }, [pagination.page, chatRoomDetail?.id]);

  const paginationRoom = usePagination();
  const getChatRoom = () => {
    if (!roomId) return;
    chatService
      .getChatRooms({
        page: paginationRoom.page,
        page_size: paginationRoom.pageSize,
        search: paginationRoom.search,
        shop_id: roomId.toLocaleString(),
      })
      .then((res) => {
        setChatRoomDetail(res.data.data.results[0]);
        console.log(res.data.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getChatRoom();
    getShop();
  }, []);
  return (
    <div className=" relative">
      <div className="w-full fixed top-0 bg-[#C71F37] py-4 flex items-center justify-center text-white z-50">
        <h1 className="font-medium text-[14px]">
          Chat with {shopDetail?.name} Manager
        </h1>
      </div>

      <div className="overflow-y-scroll  border p-4 pb-36 rounded bg-gray-100 mb-4 ">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <div
              className={`flex flex-col  px-3 py-2  rounded  shadow mb-2 ${
                msg.sender == MESSAGE_SENDER.USER
                  ? "items-end bg-[#C71F37]/10"
                  : "items-start"
              }`}
            >
              <span
                className={`font-normal text-[16px] ${
                  msg.sender == MESSAGE_SENDER.USER ? "text-right" : "text-left"
                }`}
              >
                {msg.text}
              </span>
              <span
                className={`font-normal text-gray-400 ${
                  msg.sender == MESSAGE_SENDER.USER ? "text-right" : "text-left"
                }`}
              >
                {timeAgo(msg.create_date || "")}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-28 flex gap-2 w-full">
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
    </div>
  );
}
