"use client";
import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { usePagination } from "@/hook/usePagination";
import ChatRoom from "@/components/Chat/ChatRoom";
import MessageList from "@/components/Chat/MessageList";
import { ChatRoomType } from "@/type/message.model";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [chatRoomDetail, setChatRoomDetail] = useState<ChatRoomType>();

  const pagination = usePagination();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {}, [pagination.page, pagination.search]);

  return (
    <div className="w-full ">
      <div className="flex justify-between items-center px-2 lg:px-12 py-4">
        <h1 className="text-[30px] text-gray-700 font-medium">Chats</h1>
      </div>
      <div className="w-full flex items-start justify-center h-full ">
        <div className="flex items-start justify-center w-6xl bg-white min-h-96 rounded-lg px-5 py-16 gap-3">
          <div className="flex-1/4 px-3  h-full">
            <ChatRoom setChatRoomDetail={setChatRoomDetail} />
          </div>
          <div className="flex-3/4  ">
            <MessageList chatRoomDetail={chatRoomDetail} />
          </div>
        </div>
      </div>
    </div>
  );
}
