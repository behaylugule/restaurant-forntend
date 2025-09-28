"use client";
import Navbar from "@/components/client/home/navebar";
import BottomBar from "@/components/client/commen/BottomBar";
import { ReactNode, useState } from "react";
import AIAssistance from "@/components/client/ai-assistance/Aiassistance";
import { X } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#FFFFFF]">
        <Navbar />
        <div>{children}</div>

        {/* Floating chat button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-16 right-3 z-50 bg-[#C71F37] text-white p-3 rounded-full shadow-lg hover:bg-[#a5182c] focus:outline-none focus:ring-2 focus:ring-[#C71F37]"
        >
          💬
        </button>

        {/* Chat Window */}
        {isOpen && (
          <>
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat box */}
            <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-xl border z-50 flex flex-col">
              {/* Header with close button */}

              {/* Chat content */}

              <AIAssistance />
            </div>
          </>
        )}

        <BottomBar />
      </div>
    </>
  );
}
