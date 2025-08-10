"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { User } from "@/type/user";
import { userService } from "@/lib/services/userService";
import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { USER_ROLE } from "@/utils/utils";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const onSubmit = (data: User) => {
    setIsLoading(true);
    userService
      .login({ username: data.username, password: data.password || "" })
      .then((res: any) => {
        localStorage.setItem("access", res.data.data.access);
        localStorage.setItem("refresh", res.data.data.refresh);
        login(res.data.data.access);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === USER_ROLE.USER) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full lg:w-3/4 xl:w-1/2   bg-transparent lg:bg-white flex  justify-between  ">
        <div className="flex-1 flex flex-col items-center justify-center gap-4 mb-8 py-12 px-10">
          <Image
            className="dark:invert"
            src="/globe.svg"
            alt="Next.js logo"
            width={100}
            height={38}
            priority
          />
          <div className="flex flex-col items-center">
            <h3 className="font-montserrat font-medium text-[23px] text-gray-900 text-center dark:text-white my-8 tracking-[12px]">
              Welcome Back
            </h3>
            <span className="w-full text-center mb-8 font-normal text-[14px] text-gray-700 dark:text-gray-300">
              please enter your credientials to log in
            </span>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <input
                type="text"
                {...register("username", { required: "Username Required" })}
                placeholder="Username"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 "
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}

              <input
                type="password"
                {...register("password", { required: "Password Required" })}
                placeholder="Password"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <Link
                className="self-start text-[14px] text-gray-700 "
                href="/forgetpassword"
              >
                Forgot password?
              </Link>

              <button
                type="submit"
                className="w-full bg-black text-white text-center py-2 mt-5 font-medium rounded-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Sign In"
                )}
              </button>
              <Link
                href={"/register"}
                className="block lg:hidden self-start text-[14px] text-gray-700 mt-2"
              >
                You do not have account{" "}
                <span className="font-medium">Sign Up</span> here
              </Link>
            </form>
          </div>
        </div>
        <div className="flex-1 hidden lg:flex flex-col items-center justify-center  py-12 px-10 bg-black rounded-l-4xl ">
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

          <span className="text-[14px] text-white my-8 font-normal">
            {" "}
            New to our platform? Sign Up now.
          </span>

          <Link
            href={"/register"}
            className="py-2 px-16 text-center border border-white text-white rounded-lg hover:bg-gray-600  transition-all duration-300 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
