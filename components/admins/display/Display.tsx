"use client";

import { usePagination } from "@/hook/usePagination";
import { dashboardService } from "@/lib/services/dashboard";
import { OrderType } from "@/type/order.model";
import { ORDER_STATUS, params } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import DisplayCard from "./DisplayCard";
import { useAuth } from "@/components/AuthContext";
import { orderService } from "@/lib/services/orderService";

export default function Display() {
  const [pendingOrderData, setPendingOrderData] = useState<OrderType[]>([]);
  const [processingOrderData, setProcessingOrderData] = useState<OrderType[]>(
    [],
  );
  const [readyOrderData, setReadyOrderData] = useState<OrderType[]>([]);

  const pagination = usePagination();
  const { user } = useAuth();
  const socketRef = useRef<WebSocket | null>(null);
  //websocket start
  useEffect(() => {
    if (!user && !user?.shop) return;
    const accessToken = localStorage.getItem("access");
    socketRef.current = new WebSocket(
      `ws://localhost:8000/ws/orders/${user.shop}/?token=${accessToken}`,
    );
    socketRef.current.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.status == ORDER_STATUS.PROCESSING) {
        setPendingOrderData((prev) => {
          return prev.filter((pr) => pr.id != data.id);
        });
        setProcessingOrderData((prev) => [...prev, { ...data }]);
      } else if (data.status == ORDER_STATUS.READY) {
        setProcessingOrderData((prev) => {
          return prev.filter((pr) => pr.id != data.id);
        });
        setReadyOrderData((prev) => [...prev, { ...data }]);
      } else if (data.status == ORDER_STATUS.COMPLETED) {
        setReadyOrderData((prev) => {
          return prev.filter((pr) => pr.id != data.id);
        });
      } else if (data.status == ORDER_STATUS.CANCLED) {
        setPendingOrderData((prev) => {
          return prev.filter((pr) => pr.id != data.id);
        });
        setProcessingOrderData((prev) => {
          return prev.filter((pr) => pr.id != data.id);
        });
        setReadyOrderData((prev) => {
          return prev.filter((pr) => pr.id != data.id);
        });
      } else {
        setPendingOrderData((prev) => [...prev, { ...data }]);
      }
    };
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);
  //websocket end

  const getDisplayData = (status: string) => {
    dashboardService
      .getKichenDisplay({
        page: pagination.page,
        page_size: 1000,
        status: status,
      })
      .then((res) => {
        if (status == ORDER_STATUS.PENDING) {
          setPendingOrderData(res.data.data.results);
        } else if (status == ORDER_STATUS.PROCESSING) {
          setProcessingOrderData(res.data.data.results);
        } else if (status == ORDER_STATUS.READY) {
          setReadyOrderData(res.data.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleStatusChange = (status: string, order?: OrderType) => {
    if (!order?.id) return;

    if (!socketRef.current) return;
    if (socketRef.current.readyState == WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ method: status, order_id: order.id }),
      );
    }
  };

  useEffect(() => {
    getDisplayData(ORDER_STATUS.PENDING);
    getDisplayData(ORDER_STATUS.PROCESSING);
    getDisplayData(ORDER_STATUS.READY);
  }, []);
  return (
    <div className="w-full flex gap-5 ">
      <div className="flex-1 flex flex-col gap-3 ">
        {pendingOrderData.length > 0 &&
          pendingOrderData.map((item) => (
            <DisplayCard
              order={item}
              key={item.id}
              handleStatusChange={handleStatusChange}
            />
          ))}
      </div>
      <div className="flex-1 flex flex-col gap-3">
        {processingOrderData.length > 0 &&
          processingOrderData.map((item) => (
            <DisplayCard
              order={item}
              key={item.id}
              handleStatusChange={handleStatusChange}
            />
          ))}
      </div>
      <div className="flex-1 flex flex-col gap-3">
        {readyOrderData.length > 0 &&
          readyOrderData.map((item) => (
            <DisplayCard
              order={item}
              key={item.id}
              handleStatusChange={handleStatusChange}
            />
          ))}
      </div>
    </div>
  );
}
