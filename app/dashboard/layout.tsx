"use client";
import SideBar from "@/components/commens/sidebar/Sidebar";
import Topnavbar from "@/components/commens/topnavbar/Topnavbar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CrossIcon, EyeClosedIcon, Menu, X } from "lucide-react";
import { ReactNode, useState } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="bg-[#E3E3E3]  min-h-screen">
        <Menu
          size={32}
          className="lg:hidden absolute top-6 left-3 "
          onClick={() => setOpen(true)}
        />
        <div className="w-[200px] hidden lg:block h-full fixed top-0 bg-black">
          <SideBar setOpen={setOpen} />
        </div>
        <div className="ml-0 lg:ml-[200px] ">
          <Topnavbar />
          {children}
        </div>
      </div>
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent className="h-full w-3/4 mt-0 bg-black">
          {" "}
          {/* Adjust width/height as needed */}
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-end">
              {" "}
              <X
                className="bg-white w-8 h-8 rounded-full  "
                size={32}
                onClick={() => setOpen(false)}
              />
            </DrawerTitle>
          </DrawerHeader>
          <SideBar setOpen={setOpen} />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
