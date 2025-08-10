
'use client'
import { ArrowUpRight, BookAlertIcon, ChartNoAxesGanttIcon, StoreIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { dashboardService } from "@/lib/services/dashboard";
import { GlobalDataModel } from "@/type/dashboard";

export default function Cards() {
  const [loading, isLoading] = useState<boolean>()
  const [globalData,setGlobalData] =useState<GlobalDataModel>()

  const getGlobalData=()=>{
        
        dashboardService.getGlobalCount().then((response)=>{
           setGlobalData(response.data.data)
        }).catch(err=>{

        })
  }

  useEffect(()=>{
    
    getGlobalData()

  },[])
    return (
      <>
        <div className="w-full flex flex-col gap-5 lg:flex-row items-center justify-between">
          <div className="bg-white px-6 py-6 rounded-lg w-full lg:flex-1/3 shadow-lg ">
            <div className="flex items-center justify-between mb-4">
              <BookAlertIcon
                size={64}
                className="text-gray-500 text-[#000000]"
              ></BookAlertIcon>
              <span className="flex items-center justify-center">
                <ArrowUpRight
                  size={16}
                  className="text-green-400 font-normal"
                />
                <span className="text-green-400 font-normal mr-3">5.5%</span>{" "}
                <span className="text-green-400 font-normal ">+10 today</span>
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold">
                {globalData?.total_organizations}
              </h3>
              <span className="text-[18px] font-normal text-gray-500">
                Total Organizations
              </span>
            </div>
          </div>
          <div className="bg-white px-6 py-6 rounded-lg w-full lg:flex-1/3 shadow-lg ">
            <div className="flex items-center justify-between mb-4">
              <StoreIcon  size={64} className="text-gray-500 text-[#000000]" />
              <span className="flex items-center justify-center">
                <ArrowUpRight
                  size={16}
                  className="text-green-400 font-normal"
                />
                <span className="text-green-400 font-normal mr-3">5.5%</span>{" "}
                <span className="text-green-400 font-normal ">+3 today</span>
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold">
                {globalData?.total_shops}
              </h3>
              <span className="text-[18px] font-normal text-gray-500">
                Total Shops
              </span>
            </div>
          </div>
          <div className="bg-white px-6 py-6 rounded-lg w-full lg:flex-1/3 shadow-lg ">
            <div className="flex items-center justify-between mb-4">
              <UserIcon size={64} className="text-gray-500 text-[#000000]" />
              <span className="flex items-center justify-center">
                <ArrowUpRight
                  size={16}
                  className="text-green-400 font-normal"
                />
                <span className="text-green-400 font-normal mr-3">5.5%</span>{" "}
                <span className="text-green-400 font-normal ">+1 today</span>
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold">
                {globalData?.total_users}
              </h3>
              <span className="text-[18px] font-normal text-gray-500">
                Total Users
              </span>
            </div>
          </div>
        </div>
      </>
    );
}