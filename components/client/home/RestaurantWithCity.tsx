"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, Share2Icon, Star } from "lucide-react";
import Image from "next/image";

interface City {
  name: string;
}

interface ListingData {
  id: number;
  city: string;
  numberOfListings: number;
  featuredCities: City[];
  backgroundImage: string; // URL or path to the image
}

export default function RestaurantsListWithCity() {
  const allListingData: ListingData[] = [
    {
      id: 1,
      city: "Jersey City",
      numberOfListings: 16,
      featuredCities: [
        { name: "San Diego" },
        { name: "New York" },
        { name: "Dallas" },
      ],
      backgroundImage: "/city1.jpg",
    },
    {
      id: 2,
      city: "New York City",
      numberOfListings: 250,
      featuredCities: [
        { name: "Los Angeles" },
        { name: "Chicago" },
        { name: "Miami" },
      ],
      backgroundImage: "/city2.jpg", // Using the same background for simplicity
    },
    {
      id: 3,
      city: "San Francisco",
      numberOfListings: 85,
      featuredCities: [
        { name: "Seattle" },
        { name: "Portland" },
        { name: "Austin" },
      ],
      backgroundImage: "/city3.jpg",
    },
    {
      id: 4,
      city: "Chicago",
      numberOfListings: 120,
      featuredCities: [
        { name: "Detroit" },
        { name: "Milwaukee" },
        { name: "St. Louis" },
      ],
      backgroundImage: "/city4.jpg",
    },
    {
      id: 5,
      city: "Miami",
      numberOfListings: 70,
      featuredCities: [
        { name: "Orlando" },
        { name: "Tampa" },
        { name: "Atlanta" },
      ],
      backgroundImage: "/city5.jpg",
    },

    {
      id: 6,
      city: "Dallas",
      numberOfListings: 70,
      featuredCities: [
        { name: "Orlando" },
        { name: "Tampa" },
        { name: "Atlanta" },
      ],
      backgroundImage: "/city6.jpg",
    },
  ];
  return (
    <>
      <div className="w-full flex flex-col gap-4 items-center gap-12 mt-40 lg:my-20">
        <div className="flex flex-col gap-0 lg:gap-4 items-center">
          <h1 className="text-[18px] lg:text-[40px] text-medium text-gray-600 leading-[10px] lg:leading-[20px] tracking-[0.96px] flex items-center">
            Explore Restaurants By{" "}
            <span className="text-[#C71F37]">Cities</span>
            <Image
              src="/Rectangle.png"
              alt=""
              className="w-12 h-12 mb-4 object-fit"
              width={8}
              height={8}
            />
          </h1>
          <p className="text-gray-600 w-full font-normal text-center ">
            Our cliens love our services and give great & positive reviews
          </p>
        </div>

        <div className="w-full  flex flex-wrap  justify-center gap-4">
          {allListingData.map((data, index) => {
            return (
              <Card
                key={index}
                className="py-0 mx-2 lg:mx-0 round-lg overflow-hidden relative shadow-lg lg:max-w-[400px]"
              >
                <Image
                  src={data.backgroundImage}
                  alt="city image"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
                <span
                  key={index}
                  className="absolute top-2 right-2 bg-gray-300/50  py-1 px-4  flex items-center justify-center rounded-md z-50"
                >
                  <span className="text-white">{data.numberOfListings}</span>
                </span>
                <div className="absolute left-2 bottom-2 flex z-50 gap-2">
                  {data.featuredCities.map((city, index) => {
                    return (
                      <span
                        key={index}
                        className="bg-gray-300/50  py-1 px-4  flex items-center justify-center rounded-md gap-2"
                      >
                        <span className="text-white">{city.name}</span>
                      </span>
                    );
                  })}
                </div>
                <div className="absolute top-0 left-0 z-30 w-full h-full bg-gradient-to-t from-black/30 via-black/20 to-transparent"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
