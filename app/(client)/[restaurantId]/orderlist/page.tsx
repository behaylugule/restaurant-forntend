"use client";

import Spinner from "@/components/commens/Spinner";
import { usePagination } from "@/hook/usePagination";
import { orderService } from "@/lib/services/orderService";
import { OrderType } from "@/type/order.model";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const pagination = usePagination();
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!params.restaurantId) return;
    const accessToken = localStorage.getItem("access");
    socketRef.current = new WebSocket(
      `ws://localhost:8000/ws/orders/${params.restaurantId.toLocaleString()}/?token=${accessToken}`,
    );
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setOrderList((prev) => prev.filter((pre) => pre.id != data.id));
      setOrderList((prev) => [{ ...data }, ...prev]);
    };
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [params.restaurantId?.toLocaleString()]);
  const getOrders = () => {
    setIsLoading(true);
    orderService
      .getOrders({
        page: pagination.page,
        page_size: pagination.pageSize,
        search: pagination.search,
      })
      .then((res) => {
        console.log(res.data.data);
        setOrderList(res.data.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="w-full h-full  h-screen">
      <div className="w-full flex items-center justify-center">
        <h1 className="mt-16 text-4xl font-bold text-[#C71F37]">Order List</h1>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-6">
          {orderList.map((data) => {
            return (
              <Link
                className="relative border-2 px-3 mx-8 border-[#C71F37]/50 mb-4 text-[#C71F37]  flex items-center justify-between gap-4 "
                key={data.id}
                href={`/${params.restaurantId}/orderlist/${data.id}`}
              >
                <div>
                  <h3>Order {data.id}</h3>
                  <h3>{data.shop_name}</h3>
                </div>
                <div>{data.status}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
