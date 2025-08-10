"use client";

import { useAuth } from "@/components/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/client/home/navebar";
import Header from "@/components/client/home/Header";
import { motion } from "framer-motion";
import RestaurantList from "@/components/client/home/RestaurantList";
import RestaurantsListWithCity from "@/components/client/home/RestaurantWithCity";
import ReviewList from "@/components/client/home/ReviewList";
import Footer from "@/components/client/home/Footer";
import { USER_ROLE } from "@/utils/utils";
export default function Home() {
  const { isAuthenticated, user } = useAuth();

  console.log("is Auth", isAuthenticated);
  const router = useRouter();
  console.log("user", user);

  useEffect(() => {
    if (isAuthenticated && user?.role != USER_ROLE.USER) {
      router.push("/dashboard");
    }
  }, [user?.id]);
  return (
    <>
      <div className="w-full bg-[#FFFFFF]">
        <Navbar />

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          id="header"
        >
          <Header />
        </motion.section>

        <motion.section
          initial={{ opacity: 1, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          id="list"
          className=" lg:my-10 w-full px-0 lg:px-32"
        >
          <RestaurantList />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          id="city"
          className="mt-10 w-full bg-[#F7F7F7] px-0 lg:px-32"
        >
          <RestaurantsListWithCity />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="mt-10 w-full bg-[#F7F7F7] px-0 lg:px-32"
        >
          <ReviewList />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="mt-10 w-full bg-[#F7F7F7] px-0"
        >
          <Footer />
        </motion.section>
      </div>
    </>
  );
}
