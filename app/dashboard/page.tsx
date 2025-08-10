"use client";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Cards from "@/components/admins/dashboard/Cards";
import LineBarDashboard from "@/components/admins/dashboard/LineBarDashboard";
import TopCategories from "@/components/admins/dashboard/TopCategories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Display from "@/components/admins/display/Display";

export default function Page() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
    if (user?.role == "user") {
      router.push("/");
    }
  }, [isAuthenticated]);

  const handleOnChange = (value: string) => {
    console.log(value);
  };
  return (
    <>
      <Tabs defaultValue="dashboard" className="w-full px-2 lg:px-12 pb-10">
        <TabsList className="mt-6 flex gap-6 w-full bg-trnsparent h-16">
          <TabsTrigger
            value="dashboard"
            className="text-[28px] font-medium text-gray-500"
          >
            Dashboad
          </TabsTrigger>
          <TabsTrigger
            value="display"
            className="text-[28px] font-medium text-gray-500"
          >
            Display
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="flex justify-between items-center  py-12">
            <span className="text-[28px] font-normal">Dashboard</span>
            <div>
              <Select onValueChange={handleOnChange}>
                <SelectTrigger className="w-[180px] bg-white rounded-lg py-6">
                  <SelectValue placeholder="Showing:" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel></SelectLabel>
                    <SelectItem value="this_year">This Year</SelectItem>
                    <SelectItem value="last_30_days">Last 30 days</SelectItem>
                    <SelectItem value="last_7_days">Last 7 days</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-8  lg:flex-row">
            <div className="flex-1 lg:flex-2/3 flex flex-col  gap-10 px-2 lg:px-0">
              <Cards />
              <LineBarDashboard />
            </div>
            <div className="flex-1 lg:flex-1/3 px-2 lg:px-0">
              <TopCategories />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="display">
          <Display />
        </TabsContent>
      </Tabs>
    </>
  );
}
