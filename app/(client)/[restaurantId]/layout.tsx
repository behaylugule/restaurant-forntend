"use client";
import Navbar from "@/components/client/home/navebar";
import BottomBar from "@/components/client/commen/BottomBar";
import { ReactNode, useState } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <div className="w-full bg-[#FFFFFF] ">
        <Navbar />
        <div>{children}</div>

        <BottomBar />
      </div>
    </>
  );
}
