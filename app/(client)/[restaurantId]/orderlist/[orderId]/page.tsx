"use client";

import { host } from "@/utils/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderItemType } from "@/type/orderitem.model";
import { orderItemService } from "@/lib/services/orderItemService";
import { usePagination } from "@/hook/usePagination";
import { orderService } from "@/lib/services/orderService";
import { OrderType } from "@/type/order.model";
import Link from "next/link";
import Spinner from "@/components/commens/Spinner";
import { RatIcon, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { menuRateService } from "@/lib/services/menurate.service";
import { MenuRateType } from "@/type/menurate.model";
import toast from "react-hot-toast";

export default function Page() {
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderType>();
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const pagination = usePagination();
  const [orderItemDetail, setOrderItemDetail] = useState<OrderItemType>();
  const [openRateModal, setOpenRateModal] = useState<boolean>(false);
  const [starValue, setStarValue] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [menuRateDetail, setMenuRateDetail] = useState<
    MenuRateType | undefined
  >();

  const getOrderItems = () => {
    setIsLoading(true);
    orderItemService
      .getOrderItems({
        page: pagination.page,
        page_size: pagination.pageSize,
        search: pagination.search,
        order_id: params.orderId?.toLocaleString(),
      })
      .then((res) => {
        setIsLoading(false);
        setOrderItems(res.data.data.results);
        getTotal(res.data.data.results);
      })

      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const getOrder = () => {
    if (params.orderId?.toLocaleString()) {
      orderService
        .getOrder(params.orderId?.toLocaleString())
        .then((res) => {
          setOrderDetail(res.data.data);
        })
        .catch((err) => {});
    }
  };

  const getTotal = (orderItems: OrderItemType[]) => {
    console.log("order item ", orderItems);
    setTotalPrice(0);
    orderItems?.map((data) => {
      setTotalPrice((prev) => prev + data.price * data.quantity);
    });
  };

  useEffect(() => {
    getOrderItems();
    getOrder();
  }, []);

  useEffect(() => {
    if (!openRateModal) {
      setStarValue(0);
      setComment("");
      setOrderItemDetail(undefined);
      setIsEdit(false);
      setMenuRateDetail(undefined);
    } else {
      menuRateService
        .getMenuRate({
          page: 1,
          page_size: 10,
          order_id: orderDetail?.id,
          menu_id: orderItemDetail?.menu,
        })
        .then((res) => {
          if (res.data.data.results?.length > 0) {
            setMenuRateDetail(res.data.data.results?.[0]);
            setComment(res.data.data.results?.[0].comment);
            setStarValue(res.data.data.results?.[0].rate);
            setIsEdit(true);
          }
        })
        .catch((res) => {});
    }
  }, [openRateModal]);

  const handleSubmitRateModal = () => {
    console.log(orderItemDetail, orderDetail);
    if (!orderItemDetail?.menu || !orderDetail?.shop) {
      return;
    }
    if (isEdit) {
      if (menuRateDetail?.id) {
        menuRateService
          .updateMenuRate(menuRateDetail.id, {
            ...menuRateDetail,
            comment: comment,
            rate: starValue,
          })
          .then((res) => {
            toast.success("feedback updated");
            setOpenRateModal(false);
          })
          .catch((err) => {});
      }
    } else {
      const data = {
        rate: starValue,
        comment: comment,
        menu: orderItemDetail.menu,
        shop: orderDetail.shop,
        order: orderDetail.id,
      };
      setIsLoading(true);
      menuRateService
        .createMenuRate(data)
        .then((res) => {
          setIsLoading(false);
          setOpenRateModal(false);
          setComment("");
          setOrderItemDetail(undefined);
          setStarValue(0);
          toast.success("feedback created");
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-full h-full  h-screen">
      <div className="w-full flex items-center justify-center">
        <h1 className="mt-24 text-4xl font-bold text-[#C71F37]">
          Order {orderDetail?.id} ( {orderDetail?.status})
        </h1>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          {orderItems.map((data) => {
            return (
              <div
                className="relative w-full border-y-2 px-8 border-[#C71F37] py-4 flex items-center justify-between gap-4 "
                key={data.id}
              >
                <div className="w-32 h-32 rounded-lg">
                  <Image
                    className="w-full h-full object-cover rounded-lg"
                    alt="alt"
                    src={`${host}/${data.menu_url}`}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p>{data.menu_name}</p>
                </div>
                <div className="text-[16px] text-[#C71F37]">
                  <h3>price: {data.price}</h3>
                  <h3>quantity:{data.quantity}</h3>
                  <h3 className="font-medium">
                    total:{data.price * data.quantity}
                  </h3>
                </div>

                <Star
                  className="absolute top-2 right-2 cursor-pointer hover:text-[#000] shadow-[30px]  text-[#C71F37] "
                  onClick={() => {
                    setOrderItemDetail(data);
                    setOpenRateModal(true);
                  }}
                />
              </div>
            );
          })}

          <div className="w-full flex items-center justify-end px-6 text-[32px]">
            <h2 className="text-[#C71F37]">Total: {totalPrice}</h2>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center w-full mt-10">
        <Link
          href={`/${params.restaurantId}/orderlist`}
          className="bg-[#C71F37] hover:scale-125 hover:bg-[#C71F37] text-white px-16 py-3 mt-16 rounded-md "
        >
          Back to Order
        </Link>
      </div>

      <Dialog open={openRateModal} onOpenChange={setOpenRateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Give a rate</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex flex-col gap-6">
            <div className="flex gap-3 items-center text-[#C71F37]">
              <Star
                onClick={() => setStarValue(1)}
                className="cursor-pointer"
                fill="#C71F37"
                fillOpacity={`${starValue >= 1 ? "1" : "0"}`}
              />

              <Star
                onClick={() => setStarValue(2)}
                className="cursor-pointer"
                fill="#C71F37"
                fillOpacity={`${starValue >= 2 ? "1" : "0"}`}
              />
              <Star
                onClick={() => setStarValue(3)}
                className="cursor-pointer"
                fill="#C71F37"
                fillOpacity={`${starValue >= 3 ? "1" : "0"}`}
              />
              <Star
                onClick={() => setStarValue(4)}
                fill="#C71F37"
                fillOpacity={`${starValue >= 4 ? "1" : "0"}`}
              />
              <Star
                onClick={() => setStarValue(5)}
                fill="#C71F37"
                fillOpacity={`${starValue >= 5 ? "1" : "0"}`}
              />
            </div>
            <Textarea
              placeholder="Type your comment here."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              className="bg-[#C71F37] hover:scale-125 hover:bg-[#C71F37] text-white px-16 py-3  rounded-md "
              onClick={handleSubmitRateModal}
              disabled={isLoading}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
