"use client";
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { userService } from "@/lib/services/userService";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { useSearchParams } from "next/navigation";

function PasswordRest() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ password: string; confirm_password: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isMatch, setMatch] = useState(true);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    userService
      .resetPassword({
        token: searchParams.get("token")?.toLocaleLowerCase() || "",
        password: data.password,
      })
      .then((res) => {
        setIsLoading(false);
        toast.success("Password Reset Success");
        router.push("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message);
      });
  };
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className=" w-full lg:w-3/4 xl:w-1/2 lg:bg-white flex justify-between">
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
            <h3 className="font-montserrat font-medium text-[23px] text-gray-900 text-center dark:text-white my-8 tracking-[12px]">
              Reset Password
            </h3>
            <span className="w-full text-center mb-8 font-normal text-[14px] text-gray-700 dark:text-gray-300">
              Please enter your new password
            </span>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {errors.password && (
                <span className="text-red-500">{errors.password?.message}</span>
              )}
              <input
                type="password"
                id="password"
                {...register("password", { required: "password is required" })}
                placeholder="new password"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
              />

              {errors.confirm_password && (
                <span className="text-red-500">
                  {errors.confirm_password?.message}
                </span>
              )}
              <input
                type="password"
                id="confirm_password"
                {...register("confirm_password", {
                  required: "confirm password is required",
                })}
                placeholder="confirm password"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                onChange={(e) =>
                  setMatch(e.target.value == getValues("password"))
                }
              />
              {isMatch ? (
                ""
              ) : (
                <span className="text-red-600 text-sm">
                  password is not match
                </span>
              )}
              <button
                type="submit"
                disabled={!isMatch}
                className="w-full bg-black text-white text-center py-2 mt-5 font-medium rounded-lg hover:bg-black/80 transition-all duration-300 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
            <Link
              href={"/login"}
              className=" px-3 font-normal  text-center border border-black  text-black rounded-l-full transition-all duration-300 cursor-pointer absolute top-4 right-0"
            >
              BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <PasswordRest />
    </Suspense>
  );
}
