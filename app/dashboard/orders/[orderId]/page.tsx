"use client";
import { useAuth } from "@/components/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hook/usePagination";
import { orderItemService } from "@/lib/services/orderItemService";
import { ORDER_STATUS } from "@/utils/utils";
import { OrderItemType } from "@/type/orderitem.model";
import { OrderType } from "@/type/order.model";
import { orderService } from "@/lib/services/orderService";
import { reportsService } from "@/lib/services/reportService";
import toast from "react-hot-toast";

export default function Page() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [orderItemsData, setOrderItemsData] = useState<OrderItemType[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderType>();
  const [isLoading, setIsLoading] = useState(false);
  const pagination = usePagination();
  const params = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getOrderitems();
  }, [pagination.page, pagination.search]);

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderitems = () => {
    orderItemService
      .getOrderItems({
        page: pagination.page,
        search: pagination.search,
        page_size: pagination.pageSize,
        order_id: params.orderId?.toLocaleString(),
      })
      .then((res) => {
        setIsLoading(false);
        setOrderItemsData(res.data.data.results);
        pagination.setTotalCount(res.data.data.count);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const getOrderDetails = () => {
    if (params.orderId?.toLocaleString()) {
      setIsLoading(true);
      orderService
        .getOrder(params.orderId.toLocaleString())
        .then((res) => {
          setOrderDetail(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const generateOrderReport = () => {
    if (!params.orderId?.toLocaleString()) return;
    reportsService
      .generateOrderDetail(params.orderId.toLocaleString())
      .then((res) => {
        toast.success(res.data.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateButton = (status: string) => {
    if (!orderDetail?.id) {
      return;
    }
    orderService
      .orderDetailDo(orderDetail.id, status, {})
      .then((res) => {
        getOrderDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-2 lg:px-12 py-4">
        <Button
          className="bg-[#C71F37] hover:bg-[#C71F37]/80"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <h3 className="text-[32px] text-gray-600 flex items-center gap-5">
          #Order-{orderDetail?.id}-{" "}
          <span className="text-[20px]">status: {orderDetail?.status}</span>
        </h3>
        {orderDetail?.status == ORDER_STATUS.PENDING ? (
          <div className="flex items-center gap-3">
            <Button onClick={() => handleUpdateButton(ORDER_STATUS.CANCLED)}>
              Cancle Order
            </Button>
            <Button
              className="bg-[#C71F37] hover:bg-[#C71F37]/80"
              onClick={() => handleUpdateButton(ORDER_STATUS.COMPLETED)}
            >
              Complete Order
            </Button>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          {" "}
          <Button
            variant="secondary"
            className="ml-4"
            onClick={generateOrderReport}
          >
            Generate Report
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center px-2 lg:px-12">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead> Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              orderItemsData.map((orderItem: OrderItemType, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{orderItem?.id}</TableCell>
                    <TableCell>{orderItem?.menu_name}</TableCell>
                    <TableCell>{orderItem?.price}</TableCell>
                    <TableCell>{orderItem.quantity}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <Pagination className="self-start">
          <PaginationContent>
            <PaginationItem
              onClick={isLoading ? undefined : pagination.handlePrevPage}
            >
              <PaginationPrevious />
            </PaginationItem>
            {pagination.totalCount > 0 && (
              <>
                {
                  <PaginationItem>
                    <PaginationLink>
                      Total:{pagination.totalCount}
                    </PaginationLink>
                  </PaginationItem>
                }
              </>
            )}

            <PaginationItem
              onClick={isLoading ? undefined : pagination.handleNextPage}
              className={
                orderItemsData.length === 0
                  ? "pointer-events-none opacity-50 "
                  : ""
              }
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
