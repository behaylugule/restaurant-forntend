"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { User } from "@/type/user";
import { userService } from "@/lib/services/userService";
import { useState } from "react";
import {useAuth} from "@/components/AuthContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Login(){

  const { register, handleSubmit, formState: {errors}} = useForm<{otp:string}>();
  const [isLoading , setIsLoading] = useState<boolean>(false)
  const {login,isAuthenticated} = useAuth()
  const router = useRouter()
  const onSubmit = (data:{otp:string}) =>{
    setIsLoading(true)
    
  }
    useEffect(()=>{
        if(isAuthenticated){
          router.push('/')
        }
    },[isAuthenticated])
    return(
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full lg:w-3/4 xl:w-1/2  lg:bg-white flex  justify-between  ">
            <div className="flex-1 flex flex-col items-center justify-center gap-4 mb-8 py-12 px-10 relative">
                
                 <Image
                          className="dark:invert"
                          src="/globe.svg"
                          alt="Next.js logo"
                          width={100}
                          height={38}
                          priority
                        />
                        <div className="flex flex-col items-center">

                        
                  <h3 className="font-montserrat font-medium text-[23px] text-gray-900 text-center dark:text-white my-8 tracking-[5px]">Check your Mailbox</h3>
                  <span className="w-full text-center mb-8 font-normal text-[14px] text-gray-700 dark:text-gray-300">Please enter the OTP to proceed</span>
                 <form onSubmit ={handleSubmit(onSubmit)} className="w-full">
                    
                    
                            <input 
                            type="text" 
                             {...register("otp", {required:"OTP Required"})}
                            placeholder="Username"
                            className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 "
                            />
                            {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}

                          
                            <button type="submit" className="w-full bg-black text-white text-center py-2 mt-5 font-medium rounded-lg hover:bg-black/80 transition-all duration-300 cursor-pointer" >
                            {isLoading?<span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>:"Verify"}
                          
                            
                            </button>
                  </form>
                    </div>
                       <Link href={'/forgetpassword'} className=" px-3 font-normal  text-center border border-black  text-black rounded-r-full transition-all duration-300 cursor-pointer absolute top-4 left-0">BACK</Link>
                
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
                    <h3 className="font-montserrat font-medium text-[23px] text-white text-center my-8 tracking-[12px]">BookWarm</h3>
                </div>
              
                            <span className="text-[14px] text-white my-8 font-normal w-[250px]"> Your premier digital library for borrowing and reading books</span>

                            
            </div>
        </div>

        </div>
       
    )
}