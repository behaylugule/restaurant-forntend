import { useCart } from "@/components/CartContext";
import {
  ChartBarBigIcon,
  Heart,
  HeartIcon,
  HomeIcon,
  ListCheckIcon,
  MessageCircleDashedIcon,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BottomBar() {
  const { cartItems } = useCart();
  const params = useParams();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-200 py-4 flex items-center justify-between px-5">
      <Link
        href={`/${params.restaurantId}/orderlist`}
        className="relative w-10 h-10"
      >
        <ListCheckIcon className="text-[#C71F37] w-full h-full" />
      </Link>
      <Link
        href={`/${params.restaurantId}/orderlist`}
        className="relative w-10 h-10"
      >
        <HeartIcon className="text-[#C71F37] w-full h-full" />
      </Link>
      <Link
        href={`/${params.restaurantId}`}
        className="relative w-16 h-16 bg-white rounded-full mt-[-70px] flex items-center justify-center"
      >
        <HomeIcon className="text-[#C71F37] " size={32} />
      </Link>
      <div className="flex justify-between gap-8">
        <Link
          href={`/${params.restaurantId}/chat`}
          className="relative w-10 h-10"
        >
          <MessageCircleMore className="text-[#C71F37] w-full h-full" />
        </Link>
        <Link
          href={`/${params.restaurantId}/cart`}
          className="relative w-10 h-10"
        >
          <ChartBarBigIcon className="text-[#C71F37] w-full h-full" />
          {cartItems.length > 0 && (
            <span className="absolute top-[-5px] flex items-center justify-center right-[-10px] rounded-full w-6 h-6 bg-[#C71F37]  text-white">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
