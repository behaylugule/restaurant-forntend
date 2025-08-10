"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  Heart,
  Share,
  Share2,
  Share2Icon,
  Star,
  ViewIcon,
} from "lucide-react";
import Image from "next/image";
import { shopService } from "@/lib/services/shopsService";
import { useEffect, useState } from "react";
import { ShopType } from "@/type/shops.model";
import { usePagination } from "@/hook/usePagination";
import { host } from "@/utils/utils";
import Link from "next/link";

const restaurantdata = [
  {
    id: 1,
    status: "OPEN",
    priceLevel: "$$$",
    isFeatured: true,
    imageUrl: "/istockphoto-2171064350-1024x1024.jpg",
    title: "The Big Bumbble Gym",
    description: "Cicero famously orated against his political.",
    contact: "+42 515 635 4758",
    organization: "Kaldus",
    location: "Tokyo, Japan",
    owner: {
      name: "John Doe",
      avatar: "/images/owner1.jpg",
      isVerified: true,
    },
    tags: ["Fitness"],
    extraTags: 2,
    actions: {
      views: 1200,
      favorites: 300,
      shareable: true,
    },
  },
  {
    id: 2,
    status: "OPEN",
    priceLevel: "$$",
    isFeatured: false,
    imageUrl: "/istockphoto-2175320091-1024x1024.jpg",
    title: "Iron Paradise",
    description: "Unleash your strength with world-class trainers.",
    contact: "+44 123 456 7890",
    location: "London, UK",
    organization: "Kaldus",
    owner: {
      name: "Emma Smith",
      avatar: "/images/owner2.jpg",
      isVerified: false,
    },
    tags: ["Fitness", "Wellness"],
    extraTags: 1,
    actions: {
      views: 890,
      favorites: 120,
      shareable: true,
    },
  },
  {
    id: 3,
    status: "CLOSED",
    priceLevel: "$",
    isFeatured: true,
    imageUrl: "/outdoor-dining-1846137_1280.jpg",
    title: "Downtown Fit Club",
    description: "Train like a pro in the heart of the city.",
    contact: "+1 987 654 3210",
    organization: "Kaldus",
    location: "New York, USA",
    owner: {
      name: "Mike Johnson",
      avatar: "/images/owner3.jpg",
      isVerified: true,
    },
    tags: ["Fitness", "Yoga"],
    extraTags: 3,
    actions: {
      views: 1500,
      favorites: 450,
      shareable: false,
    },
  },
  {
    id: 1,
    status: "OPEN",
    priceLevel: "$$$",
    isFeatured: true,
    imageUrl: "/istockphoto-2171064350-1024x1024.jpg",
    title: "The Big Bumbble Gym",
    description: "Cicero famously orated against his political.",
    contact: "+42 515 635 4758",
    organization: "Kaldus",
    location: "Tokyo, Japan",
    owner: {
      name: "John Doe",
      avatar: "/images/owner1.jpg",
      isVerified: true,
    },
    tags: ["Fitness"],
    extraTags: 2,
    actions: {
      views: 1200,
      favorites: 300,
      shareable: true,
    },
  },
  {
    id: 2,
    status: "OPEN",
    priceLevel: "$$",
    isFeatured: false,
    imageUrl: "/istockphoto-2175320091-1024x1024.jpg",
    title: "Iron Paradise",
    description: "Unleash your strength with world-class trainers.",
    contact: "+44 123 456 7890",
    location: "London, UK",
    organization: "Kaldus",
    owner: {
      name: "Emma Smith",
      avatar: "/images/owner2.jpg",
      isVerified: false,
    },
    tags: ["Fitness", "Wellness"],
    extraTags: 1,
    actions: {
      views: 890,
      favorites: 120,
      shareable: true,
    },
  },
  {
    id: 3,
    status: "CLOSED",
    priceLevel: "$",
    isFeatured: true,
    imageUrl: "/outdoor-dining-1846137_1280.jpg",
    title: "Downtown Fit Club",
    description: "Train like a pro in the heart of the city.",
    contact: "+1 987 654 3210",
    organization: "Kaldus",
    location: "New York, USA",
    owner: {
      name: "Mike Johnson",
      avatar: "/images/owner3.jpg",
      isVerified: true,
    },
    tags: ["Fitness", "Yoga"],
    extraTags: 3,
    actions: {
      views: 1500,
      favorites: 450,
      shareable: false,
    },
  },
];

export default function RestaurantList() {
  const [shopsData, setShopsData] = useState<ShopType[]>([]);
  const pagination = usePagination();

  const getShops = () => {
    shopService
      .getShopsForClient({
        page: pagination.page,
        page_size: pagination.pageSize,
        search: pagination.search,
      })
      .then((res) => {
        console.log(res.data.data.results);
        setShopsData(res.data.data.results);
        pagination.setTotalCount(res.data.data.count);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getShops();
  }, [pagination.page, pagination.search]);

  return (
    <>
      <div className="w-full flex flex-col gap-4 items-center gap-4 lg:gap-12  lg:my-20">
        <div>
          <h1 className="text-[18px] lg:text-[40px] text-medium text-gray-600 leading-[14px] lg:leading-[20px] tracking-[0.96px] flex items-center">
            Explore Trending <span className="text-[#C71F37]">Restaurant</span>
            <Image
              src="/Rectangle.png"
              alt=""
              className="w-12 h-12 mb-4 object-fit"
              width={8}
              height={8}
            />
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {shopsData.map((data, index) => {
            return (
              <div key={index} className="relative">
                <Link href={`/${data.id}`} key={index}>
                  <Card className="pt-0 relative shadow-lg">
                    <div className="absolute top-2 left-2 z-50 flex items-center justify-start gap-5">
                      <span
                        className={`text-white text-sm font-normal min-w-[70px] py-1 flex items-center justify-center rounded-md ${
                          "OPEN" == "OPEN" ? "bg-[#27A860]" : "bg-[#D73939]"
                        }`}
                      >
                        <span>OPEN</span>
                      </span>
                      <span className="bg-gray-300/50 text-white  py-1 px-4 min-w-[60px] flex items-center justify-center rounded-md gap-2">
                        $
                      </span>

                      <span className="bg-gray-300/50  py-1 px-4 min-w-[60px] flex items-center justify-center rounded-md gap-2">
                        <Star className="text-white" />
                        <span className="text-white">Featured</span>
                      </span>
                    </div>
                    <CardContent className="px-0 relative">
                      {/* <Image
                    src={data.shop_logo}
                    className="w-full h-[270px] object-fit"
                    width={300}
                    height={300}
                    alt="restaurant image"
                  /> */}
                      {data.shop_logo && (
                        <Image
                          src={`${host}/${data.logo_url}`}
                          alt="Shop Logo"
                          width={300}
                          height={270}
                          className="w-full h-[270px] object-cover"
                        />
                      )}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/30 via-black/20 to-transparent"></div>
                    </CardContent>
                    <CardContent>
                      <h1 className="font-medium text-[20px] text-gray-600">
                        {data.name}
                      </h1>
                      <p className="font-medium text-[14px] text-gray-600 mb-5">
                        {data.organization_name}
                      </p>
                      <div className="flex">
                        <span>{data.address}</span>
                      </div>
                    </CardContent>

                    <CardContent className="flex items-center justify-between mt-2">
                      <h3>{data.organization}</h3>
                      <span className="flex items-center gap-3 text-gray-600">
                        <Eye className="cursor-pointer text-gray-600" />
                        <Heart className="cursor-pointer text-gray-600" />
                        <Share2Icon className="cursor-pointer text-gray-600" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>

                <Link
                  href={`https://www.google.com/maps?q=${data.lat},${data.lng}`}
                  target="_blank"
                  rel="noopener noreferrer "
                  className="text-[#C71F37] absolute bottom-16 right-4"
                >
                  Open in Google Maps
                </Link>
              </div>
            );
          })}
        </div>

        <div>
          <Button className="bg-[#C71F00]/10 text-[#C71F00] py-8 px-10 hover:bg-[#C71F00] hover:text-white rounded-full ">
            Explore More Restaurants
          </Button>
        </div>
      </div>
    </>
  );
}
