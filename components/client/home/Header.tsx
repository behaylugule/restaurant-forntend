"use client";

import { Button } from "@/components/ui/button";
import { Form, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { LocateIcon, MapPinCheckIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const fullText = "Explore Nearby Restaurants";
const typingSpeed = 100; // milliseconds per character
const pauseTime = 2000;

export default function Header() {
  const form = useForm();

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

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

  const onSubmit = (data: any) => {};

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Image */}
        <Image
          src="/pexels-umkreisel-app-1269790.jpg"
          className="w-full h-full object-fit hidden lg:block"
          alt="Restaurant interior"
          fill={true}
        />
        <Image
          src="/kayleigh-harrington-yhn4okt6ci0-unsplash.jpg"
          className="w-full h-full object-fit block lg:hidden object-cover"
          alt="Restaurant interior"
          fill={true}
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-black/60 to-transparent"></div>
        {/* Optional content */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col gap-10">
          <div className="flex flex-col gap-10 items-center align-center ">
            <h1 className="text-white text-[16px] lg:text-[60px] font-bold min-h-[100px]">
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

            <p className="text-gray-100 text-[14px] text-center lg:text-[20px] font-normal">
              Browse high-rated hotels, restaurants, attractions, activities and
              more!
            </p>
          </div>

          <div className="flex">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2"
              >
                <FormItem className="outline-hidden">
                  <Input
                    placeholder="What are you looking for?"
                    {...form.register("preference")}
                    className="bg-white text-[16px] p-6 focus-visible:outline-none focus-visible:border-none ring-[3px] ring-transparent  focus-visible:ring-[#C71F37]"
                  />
                </FormItem>
                <FormItem className="relative">
                  <Input
                    placeholder="Location?"
                    {...form.register("preference")}
                    className="bg-white text-[16px] p-6 focus-visible:outline-none focus-visible:border-none ring-[3px] ring-transparent  focus-visible:ring-[#C71F37]"
                  />
                  <MapPinCheckIcon className="absolute right-3 top-[27%]" />
                </FormItem>
                <FormItem className="outline-hidden">
                  <Input
                    placeholder="Eat & Drinking?"
                    {...form.register("preference")}
                    className="bg-white text-[16px] p-6 focus-visible:outline-none focus-visible:border-none ring-[3px] ring-transparent  focus-visible:ring-[#C71F37]"
                  />
                </FormItem>
                <Button
                  type="submit"
                  className=" flex items-center justify-center bg-[#C71F37] items-center min-w-[150px]  hover:bg-[#C71F00] cursor-pointer  text-white  rounded-md py-6 px-16"
                >
                  <SearchIcon /> Search
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
