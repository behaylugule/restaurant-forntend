"use client";

import { Settings, User, User2Icon } from "lucide-react";
import { useAuth } from "../../AuthContext";
import { format } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Separator } from "../../ui/separator";
import ChangePassword from "../../admins/user/ChangePassword";
import UpdateProfile from "../../admins/user/UpdateProfile";
import { params } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { generatePdf } from "@/utils/generatePdf";

export default function Topnavbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const now = new Date();
  const pathname = usePathname();

  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!user?.id) return;
    const accessToken = localStorage.getItem("access");

    socketRef.current = new WebSocket(
      `ws://localhost:8000/ws/reports/${user.id}/?token=${accessToken}`,
    );
    console.log("WebSocket created");

    console.log(socketRef.current);
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      generatePdf(data);
    };
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-between px-10 py-5 bg-white">
        <div className="flex items-center text-[20px]">
          <User2Icon className="mr-4 cursor-pointer" size={32} />
          <span className="flex flex-col">
            <span className="text-[14px] font-medium">{user?.username}</span>
            <span className="font-normal text-gray-700 text-[12px]">
              {user?.role}
            </span>
          </span>
        </div>

        <div className="flex items-center">
          <span className="flex flex-col  border-r-2 px-2">
            <span className="text-[14px] font-medium">
              {format(now, "h:mm a")}
            </span>
            <span className="font-normal text-gray-700 text-[12px]">
              {format(now, "dd-mm-yyyy")}
            </span>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings className="ml-4 cursor-pointer" size={32} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => setOpenProfile(true)}>
                Update Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Change Password
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <Separator />
          </DialogHeader>
          <ChangePassword setOpen={setOpen} />
        </DialogContent>
      </Dialog>

      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <Separator />
          </DialogHeader>
          <UpdateProfile setOpenProfile={setOpenProfile} />
        </DialogContent>
      </Dialog>
    </>
  );
}
