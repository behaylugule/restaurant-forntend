"use client";
import { CartItem, useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { menuRateService } from "@/lib/services/menurate.service";
import { menuService } from "@/lib/services/menuService";
import { MenuType } from "@/type/menu.model";
import { TotalMenuRate } from "@/type/menurate.model";
import { host } from "@/utils/utils";
import { ListOrderedIcon, MinusIcon, PlusIcon, Star, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const [menuDetail, setMenuDetail] = useState<MenuType>();
  const [cartData, setCartData] = useState<CartItem>();
  const [menuRate, setMenuRate] = useState<TotalMenuRate>();
  const router = useRouter();

  const {
    addToCart,
    getById,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    getMenu();
  }, []);

  const getMenu = () => {
    menuService
      .getMenu(params.menuId?.toLocaleString() || "")
      .then((res) => {
        setMenuDetail(res.data.data);
        setCartData(getById(res?.data.data.id || ""));
        menuRateService
          .menuRateDo("average_rate", res.data.data)
          .then((res) => {
            setMenuRate(res.data.data);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };
  const backToMenu = () => {
    router.back();
  };

  return (
    <div className="pb-24">
      <Image
        src={`${host}/${menuDetail?.image_url}`}
        alt="menu image"
        width={700}
        height={700}
        className="w-full h-[500px] object-cover rounded-lg"
      />
      <X
        className="fixed top-10 z-50 left-5 bg-gray-600  rounded-full text-[#C71F37] cursor-pointer"
        size={36}
        onClick={backToMenu}
      />
      <div className="px-5 py-4 w-full flex flex-col items-center">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-[20px] text-[#C71F37]">{menuDetail?.name}</h3>
          <h4 className="text-[16px] text-[#C71F37]">${menuDetail?.price}</h4>
        </div>

        <span className="flex items-center gap-6 my-4 w-full">
          <span className="flex items-center gap-3 text-[#C71F37]">
            <Star /> {menuRate?.average_rate} rating
          </span>
          <span className="flex items-center gap-3 text-[#C71F37]">
            <ListOrderedIcon /> {menuRate?.total_order}+ order
          </span>
        </span>
        <p className="mt-4 text-gray-600">
          Nulla occaecat velit laborum exercitation ullamco. Elit labore eu aute
          elit nostrud culpa velit excepteur deserunt sunt. Velit non est cillum
          consequat cupidatat ex
        </p>
        {menuDetail && menuDetail?.id && getById(menuDetail?.id)?.id ? (
          <>
            <div className="flex items-center gap-3">
              <MinusIcon
                className="text-[#C71F37] hover:text-[#000] cursor-pointer"
                onClick={() =>
                  menuDetail.id && decrementQuantity(menuDetail?.id)
                }
              />

              {getById(menuDetail?.id || "")?.quantity}
              <PlusIcon
                className="text-[#C71F37] hover:text-[#000] cursor-pointer"
                onClick={() =>
                  menuDetail.id && incrementQuantity(menuDetail?.id)
                }
              />
            </div>

            <Button
              className="bg-[#C71F37] hover:scale-125 hover:bg-[#C71F37] text-white px-16 py-6 mt-4 rounded-md "
              onClick={() => menuDetail.id && removeFromCart(menuDetail.id)}
            >
              Remove from Cart
            </Button>
          </>
        ) : (
          <Button
            className="bg-[#C71F37] hover:scale-125 hover:bg-[#C71F37] text-white px-16 py-6 mt-16 rounded-md "
            onClick={() =>
              addToCart({
                id: menuDetail?.id || "",
                name: menuDetail?.name || "",
                price: menuDetail?.price || 0,
                image_url: menuDetail?.image_url || "",
                quantity: 1,
              })
            }
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}
