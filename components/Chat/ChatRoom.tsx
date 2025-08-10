"use client";

import { usePagination } from "@/hook/usePagination";
import { chatService } from "@/lib/services/chatService";
import { ChatRoomType } from "@/type/message.model";
import { UserCheck2Icon } from "lucide-react";
import { useEffect, useState } from "react";

interface PropsTypes {
  setChatRoomDetail: (chatRoomDetail: ChatRoomType) => void;
}

export default function ChatRoom({ setChatRoomDetail }: PropsTypes) {
  const pagination = usePagination();
  const [chatRoomData, setChatRoomData] = useState<ChatRoomType[]>([]);
  const getRooms = () => {
    chatService
      .getChatRooms({
        page: pagination.page,
        page_size: pagination.pageSize,
        search: pagination.search,
      })
      .then((res) => {
        console.log(res.data);
        setChatRoomData(res.data.data.results);
        pagination.setTotalCount(res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div className="w-full flex flex-col items-start">
      <div>
        <h1 className="text-gray-700 font-semibold">Customers</h1>
      </div>
      <div className="w-full flex flex-col items-center  mt-4 gap-4 ">
        {chatRoomData.map((data, index) => {
          return (
            <button
              className="flex items-center justify-start gap-3 cursor-pointer bg-[#E3E3E3] rounded-lg px-4 py-2 w-full"
              key={index}
              onClick={() => setChatRoomDetail(data)}
            >
              <div className="flex items-center justify-center w-10 h-10 border-2 border-gray-600 rounded-full ">
                <UserCheck2Icon size={25} />
              </div>
              <h1 className="text-[16px] font-meduim text-gray-600">
                {data.client_name}
              </h1>
            </button>
          );
        })}
      </div>
    </div>
  );
}
