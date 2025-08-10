"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
function Confermation() {
  const searchParams = useSearchParams();

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full lg:w-3/4 xl:w-1/2 lg:bg-white flex justify-between">
          <div className="flex-1 hidden lg:flex flex-col items-center justify-center py-12 px-10 bg-black rounded-r-4xl">
            <div className="flex flex-col items-center justify-center">
              <Image
                className="dark:invert"
                src="/globe.svg"
                alt="Vercel logomark"
                width={100}
                height={38}
              />
              <h3 className="font-montserrat font-medium text-[23px] text-white text-center my-8 tracking-[12px]">
                BookWarm
              </h3>
            </div>
            <span className="text-[14px]  text-white my-8 font-light w-[250px] text-center">
              {" "}
              Your premier digital library for borrowing and reading books.
            </span>
            {/* <Link href={'/login'} className="py-2 px-16 text-center border border-white text-white rounded-lg hover:bg-white    /80 transition-all duration-300 cursor-pointer">Sign In</Link> */}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-4 mb-8 py-12 px-10 relative">
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="Next.js logo"
              width={100}
              height={30}
              priority
            />
            <div className="flex flex-col items-center">
              <h3 className="font-montserrat font-medium text-[23px] text-gray-900 text-center dark:text-white my-8 ]">
                Password Reset Link Sent
              </h3>
              <span className="w-full text-center mb-8 font-normal text-[14px] text-gray-700 dark:text-gray-300">
                Please Check your{" "}
                <span className="font-medium text-[16px]">
                  {searchParams.get("email")}
                </span>{" "}
                Address{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Confermation />
    </Suspense>
  );
}
