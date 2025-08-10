"use client";

import { useAuth } from "@/components/AuthContext";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Heart, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { menuService } from "@/lib/services/menuService";
import { categoryService } from "@/lib/services/categoryService";
import { usePagination } from "@/hook/usePagination";
import { CategoryModel } from "@/type/category.model";
import { MenuType } from "@/type/menu.model";
import { host } from "@/utils/utils";
import Link from "next/link";
export default function Home() {
  const { isAuthenticated, user } = useAuth();

  console.log("is Auth", isAuthenticated);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("");
  const paginationMenu = usePagination();
  const paginationCat = usePagination();
  const params = useParams();
  const [catMenuData, setCatMenuData] = useState<CategoryModel[]>([]);
  const [menuData, setMenuData] = useState<MenuType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  useEffect(() => {
    console.log(params);
  }, []);

  const getCategory = () => {
    categoryService
      .getMenuCategoriesForClient({
        id: params.restaurantId?.toLocaleString() || "",
        page: paginationCat.page,
        page_size: paginationCat.pageSize,
        search: paginationCat.search,
      })
      .then((res) => {
        paginationCat.setTotalCount(res.data.data.count);
        setCatMenuData(res.data.data.results);
        if (res.data.data.results.length) {
          setActiveTab(res.data.data.results.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMenu = () => {
    if (activeTab !== null) {
      menuService
        .getMuenubyRestorantId({
          id: params.restaurantId?.toLocaleString() || "",
          category_id: activeTab || "",
          page: paginationMenu.page,
          page_size: paginationMenu.pageSize,
          search: paginationMenu.search,
        })
        .then((res) => {
          setMenuData(res.data.data.results);
          paginationMenu.setTotalCount(res.data.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getCategory();
  }, [paginationCat.page, paginationCat.search]);

  useEffect(() => {
    getMenu();
  }, [paginationMenu.page, paginationMenu.search, activeTab]);

  const getShops = () => {};
  return (
    <>
      <div className="pt-20 px-4">
        <div className="mt-4 mb-6">
          <h3 className="text-[#C71F37] font-medium text-[18px] ">
            Good morning Warren
          </h3>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2 text-[#C71F37]" />
          <Input
            className="px-6 py-4 border-[#C71F37]/20 
             focus-visible:border-ring focus-visible:ring-[#C71F37]/100 focus-visible:ring-[3px]"
            onChange={(e) => paginationMenu.setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3 overflow-x-scroll mt-10 ">
          {catMenuData.map((data, index) => (
            <div
              className={`relative flex flex-col items-center text-gray-600 w-24 h-24    border-2 border-[#C71f37] ${
                data.id == activeTab && "bg-[#C71F37] text-white"
              }  rounded-md`}
              onClick={() => {
                setActiveTab(data.id || "");
                setSelectedCategory(data);
              }}
              key={index}
            >
              <Image
                src={`${host}/${data.image_url}`}
                alt="menu icon"
                width={100}
                height={100}
                className="w-full h-16 object-cover"
              />
              <h3 className="absolute bottom-0 left-0 w-full  flex items-center justify-center ">
                {data.name}
              </h3>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-[#C71F37] font-medium text-[18px] mt-5 ">
            {selectedCategory?.name}
          </h3>
        </div>
        <div className="mt-5 flex flex-col gap-3 mb-10">
          {menuData.map((data, index) => (
            <Link
              href={`/${params.restaurantId}/${data.id}`}
              className="max-h-[300px] p-0 rounded-lg relative "
              key={index}
            >
              <Image
                src={`${host}/${data.image_url}`}
                alt="menu image"
                width={500}
                height={500}
                className="w-full max-h-[300px] object-cover rounded-lg"
              />

              <div className="absolute bottom-2 left-0 w-full flex items-center justify-between px-8 text-white ">
                <span className="flex flex-col gap-1 text-bold text-[16px]">
                  <span>{data.name}</span>
                  <span>${data.price}</span>
                </span>
                <span>
                  <Heart />
                </span>
              </div>
              <div className="absolute left-0 left-0 w-full h-full bg-gradient-to-t from-white/10 via-white/60 to-transparent z-40"></div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
