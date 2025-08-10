import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChartBarBigIcon } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const fullText = "Restuarant SaaS";
const typingSpeed = 100; // milliseconds per character
const pauseTime = 2000;
export default function Navbar() {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (index < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, typingSpeed);
    } else {
      // wait and then reset for infinite loop
      timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, pauseTime);
    }

    return () => clearTimeout(timeout);
  }, [index]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1, // fades in over 1 second
        ease: "easeInOut",
      }}
      className="w-full  fixed top-0 left-0 bg-transparent z-50 "
    >
      <div className="flex justify-between items-center w-full h-16 px-4">
        <h1 className="hidden lg:block text-2xl font-bold text-[#C71F37] cursor-pointer py-4">
          <AnimatePresence>
            {displayedText.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </AnimatePresence>
        </h1>
        <Link
          href="/"
          className="block text-[#C71F37] lg:hidden text-[16px] lg:text-2xl font-bold  cursor-pointer py-4"
        >
          Restuarant SaaS
        </Link>

        <div className="flex gap-5">
          {isAuthenticated ? (
            <>
              <Button
                className="bg-[#C71F37] hover:scale-125 hover:bg-[#C71F37] text-white px-6 py-2 rounded-md "
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-[#C71F37] hover:scale-125 hover:bg-[#C71F37] text-white px-6 py-2 rounded-md "
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="bg-[#C71F37] hover:scale-125 text-white hover:bg-[#C71F37] px-6 py-2 rounded-md"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
