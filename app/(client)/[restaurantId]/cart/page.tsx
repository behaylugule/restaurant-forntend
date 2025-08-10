"use client";

import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { host } from "@/utils/utils";
import { DeleteIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { orderService } from "@/lib/services/orderService";
import { useState } from "react";
import Spinner from "@/components/commens/Spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Checkout from "@/components/client/cart/Checkout";

export default function Page() {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const submitOrder = () => {
    const data = {
      items: cartItems,
      shop: params.restaurantId,
      total_price: totalPrice,
    };
    setIsLoading(true);
    orderService
      .addOrder(data)
      .then((res) => {
        clearCart();
        router.push(`/${params.restaurantId}/orderlist`);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full  h-screen">
      <div className="w-full flex items-center justify-center">
        <h1 className="mt-24 text-4xl font-bold text-[#C71F37]">My Cart</h1>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          {cartItems.length > 0 ? (
            <div className="flex flex-col items-center">
              {cartItems.map((data) => {
                return (
                  <div
                    className="relative w-full border-y-2 px-8 border-[#C71F37] py-4 flex items-center justify-between gap-4 "
                    key={data.id}
                  >
                    <div className="w-32 h-32 rounded-lg">
                      <Image
                        className="w-full h-full object-cover rounded-lg"
                        alt="alt"
                        src={`${host}/${data.image_url}`}
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <MinusIcon
                        className="text-[#C71F37] hover:text-[#000] cursor-pointer"
                        onClick={() => decrementQuantity(data.id)}
                      />

                      {data.quantity}
                      <PlusIcon
                        className="text-[#C71F37] hover:text-[#000] cursor-pointer"
                        onClick={() => incrementQuantity(data.id)}
                      />
                    </div>
                    <div>
                      <h3>{data.price}</h3>
                    </div>
                    <DeleteIcon
                      className="absolute top-2 right-2 cursor-pointer hover:text-[#000] text-[#C71F37] "
                      onClick={() => removeFromCart(data.id)}
                    />
                  </div>
                );
              })}

              <Button
                className="bg-[#C71F37] hover:scale-125 hover:bg-[#C71F37] text-white px-16 py-6 mt-16 rounded-md "
                onClick={() => setOpenModal(true)}
              >
                Order
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="w-full text-center text-gray-600 text-lg font-bold mt-24">
                no cart items
              </p>
              <Link
                href={`/${params.restaurantId}`}
                className="bg-[#C71F37] hover:scale-125 hover:bg-[#C71F37] text-white px-16 py-3 mt-16 rounded-md "
              >
                Add to Cart
              </Link>
            </div>
          )}
        </div>
      )}

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order</DialogTitle>
          </DialogHeader>
          <Separator />
          <Checkout />
        </DialogContent>
      </Dialog>
    </div>
  );
}
