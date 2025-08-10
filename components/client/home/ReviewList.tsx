"use client";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
export default function ReviewList() {
  const testimonials: any[] = [
    {
      id: "testimonial-1", // Example ID
      rating: 4, // Based on the 4 filled stars visible
      headline: "One of the Superb Platform",
      reviewText:
        "Overall, the Advertize application is a powerful tool for anyone in the job market. Its reliability, extensive job listings, and user-friendly..", // Truncated as per image
      reviewerName: "Ridhika K. Sweta",
      reviewerTitle: "CEO",
      reviewerCompany: "Agreeo",
      reviewerAvatar: "/p1.png", // Placeholder or derived from the image if the avatar is separate
    },

    {
      id: "testimonial-2",
      rating: 5,
      headline: "Amazing experience!",
      reviewText:
        "This platform has revolutionized how I find talent. Highly recommended for recruiters and job seekers alike.",
      reviewerName: "John Doe",
      reviewerTitle: "HR Manager",
      reviewerCompany: "Tech Solutions Inc.",
      reviewerAvatar: "/p2.png",
    },
    {
      id: "testimonial-3",
      rating: 5,
      headline: "Amazing experience!",
      reviewText:
        "This platform has revolutionized how I find talent. Highly recommended for recruiters and job seekers alike.",
      reviewerName: "John Doe",
      reviewerTitle: "HR Manager",
      reviewerCompany: "Tech Solutions Inc.",
      reviewerAvatar: "/p3.png",
    },
    {
      id: "testimonial-4",
      rating: 5,
      headline: "Amazing experience!",
      reviewText:
        "This platform has revolutionized how I find talent. Highly recommended for recruiters and job seekers alike.",
      reviewerName: "John Doe",
      reviewerTitle: "HR Manager",
      reviewerCompany: "Tech Solutions Inc.",
      reviewerAvatar: "/p4.png",
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

        <div className="w-full  flex flex-wrap  justify-center gap-x-4 gap-y-10">
          {testimonials.map((data, index) => {
            return (
              <div
                className="flex flex-col items-center py-5 gap-12 relative border-b-2 border-gray-300"
                key={index}
              >
                <Card
                  key={index}
                  className="py-10 mx-2 z-2  lg:mx-0 px-10 flex flex-col items-center round-lg overflow-hidden  shadow-lg lg:max-w-[400px]"
                >
                  <span className="flex gap-2">
                    {[...Array(data.rating)].map((_, ind) => (
                      <Star className="w-7 h-7 text-[#FFC107]" key={ind} />
                    ))}
                  </span>
                  <h3 className="text-center text-gray-600 font-medium text-[14px]">
                    {data.headline}
                  </h3>
                  <p className="text-center text-gray-600 font-normal text-[14px]">
                    {data.reviewText}
                  </p>
                </Card>
                <div className="absolute bottom-[27%] z-1">
                  <Image
                    src="/arrow.png"
                    alt="image"
                    width={50}
                    height={50}
                    className="w-40 h-40  "
                  />
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src={data.reviewerAvatar}
                    width={200}
                    height={200}
                    className="w-16 h-16"
                    alt="image 1"
                  />
                  <h3 className="text-center text-gray-600 font-medium text-[14px]">
                    {data.reviewerName}
                  </h3>
                  <span className="text-eenter text-gray-600 font-normal text-[14px]">
                    {data.reviewerTitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
