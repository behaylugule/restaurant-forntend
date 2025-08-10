"use client";
import {
  BookAIcon,
  BookAlertIcon,
  ChartBarIcon,
  ChartNoAxesGanttIcon,
  LayoutDashboardIcon,
  ListOrderedIcon,
  MessageCircle,
  SquareMenuIcon,
  Table,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../AuthContext";
import { USER_ROLE } from "@/utils/utils";

type PropsType = {
  setOpen: (open: boolean) => void;
};
export default function SideBar({ setOpen }: PropsType) {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div className="w-full py-10">
      <div className="w-full  flex flex-col items-center">
        <Image
          className="text-white mb-10"
          src="/globe.svg"
          alt="Next.js logo"
          width={100}
          height={38}
          priority
        />
        <div className="w-full text-white">
          <Link
            onClick={() => setOpen(false)}
            className={`w-full flex items-center justify-start px-10 hover:bg-white hover:text-black py-4 ${
              pathname == "/dashboard" ? "bg-white text-black" : "text-white"
            } `}
            href="/dashboard"
          >
            <LayoutDashboardIcon className="mr-6" />
            Dashboard
          </Link>
          {user &&
            (user?.role == USER_ROLE.ADMIN ||
              user?.role == USER_ROLE.ORGANIZATION_ADMIN) && (
              <Link
                onClick={() => setOpen(false)}
                className={`w-full flex items-center mt-5 justify-start px-10 hover:bg-white hover:text-black py-4 ${
                  pathname == "/dashboard/users"
                    ? "bg-white text-black"
                    : "text-white"
                } `}
                href="/dashboard/users"
              >
                <UserIcon className="mr-6" />
                User
              </Link>
            )}
          {user && user?.role == USER_ROLE.ADMIN && (
            <Link
              onClick={() => setOpen(false)}
              className={`w-full flex items-center mt-5 justify-start px-10 hover:bg-white hover:text-black py-4 ${
                pathname == "/dashboard/organizations"
                  ? "bg-white text-black"
                  : "text-white"
              } `}
              href="/dashboard/organizations"
            >
              <BookAIcon className="mr-6" />
              Organizations
            </Link>
          )}
          {user && user?.role == USER_ROLE.ORGANIZATION_ADMIN && (
            <Link
              onClick={() => setOpen(false)}
              className={`w-full flex items-center mt-5 justify-start px-10 hover:bg-white hover:text-black py-4 ${
                pathname == "/dashboard/shops"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              href="/dashboard/shops"
            >
              <ChartNoAxesGanttIcon className="mr-6" />
              Shops
            </Link>
          )}

          {user && user?.role == USER_ROLE.SHOP_ADMIN && (
            <Link
              onClick={() => setOpen(false)}
              className={`w-full flex items-center mt-5 justify-start px-10 hover:bg-white hover:text-black py-4 ${
                pathname == "/dashboard/categories"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              href="/dashboard/categories"
            >
              <ChartBarIcon className="mr-6" />
              Categories
            </Link>
          )}

          {user && user?.role == USER_ROLE.SHOP_ADMIN && (
            <Link
              onClick={() => setOpen(false)}
              className={`w-full flex items-center mt-5 justify-start px-10 hover:bg-white hover:text-black py-4 ${
                pathname == "/dashboard/menu"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              href="/dashboard/menu"
            >
              <SquareMenuIcon className="mr-6" />
              Menu
            </Link>
          )}

          {user && user?.role == USER_ROLE.SHOP_ADMIN && (
            <Link
              onClick={() => setOpen(false)}
              className={`w-full flex items-center mt-5 justify-start px-10 hover:bg-white hover:text-black py-4 ${
                pathname == "/dashboard/orders"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              href="/dashboard/orders"
            >
              <ListOrderedIcon className="mr-6" />
              Orders
            </Link>
          )}

          {user && user?.role == USER_ROLE.SHOP_ADMIN && (
            <Link
              onClick={() => setOpen(false)}
              className={`w-full flex items-center mt-5 justify-start px-10 hover:bg-white hover:text-black py-4 ${
                pathname == "/dashboard/feedbacks"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              href="/dashboard/feedbacks"
            >
              <BookAlertIcon className="mr-6" />
              FeedBacks
            </Link>
          )}

          {user && user?.role == USER_ROLE.SHOP_ADMIN && (
            <Link
              onClick={() => setOpen(false)}
              className={`w-full flex items-center mt-5 justify-start px-10 hover:bg-white hover:text-black py-4 ${
                pathname == "/dashboard/chats"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              href="/dashboard/chats"
            >
              <MessageCircle className="mr-6" /> Chat
            </Link>
          )}
          {user && user?.role == USER_ROLE.SHOP_ADMIN && (
            <Link
              onClick={() => setOpen(false)}
              className={`w-full flex items-center mt-5 justify-start px-7 hover:bg-white hover:text-black py-4 ${
                pathname == "/dashboard/dining-tables"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              href="/dashboard/dining-tables"
            >
              <Table className="mr-6" />
              Dining Tables
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
