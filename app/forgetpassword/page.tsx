"use client";
import Image from "next/image"
import Link from "next/link"

import  {useForm} from 'react-hook-form';
import { User} from "@/type/user";
import {userService} from "@/lib/services/userService"
import { useState } from "react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {useAuth} from '@/components/AuthContext'

export default function Register(){

    const { register, handleSubmit, getValues,formState:{errors}} = useForm<{email:string}>();
    const [isLoading,setIsLoading]= useState<boolean>(false)
    const {isAuthenticated} = useAuth()
    const router = useRouter()
    const onSubmit = async (data:any)=>{
        setIsLoading(true)
        userService.forgetPassword(data.email).then((res)=>{
            
            setIsLoading(false)
             router.push(`/confrimation/?email=${getValues('email')}`)
        }).catch(err=>{
            toast.error(err.response.data.message)
            setIsLoading(false)
        })
       
    }
    useEffect(()=>{
        if(isAuthenticated){
            router.push('/login')
        }
        
    },[isAuthenticated])
    return(
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full lg:w-3/4 xl:w-1/2  lg:bg-white flex justify-between">
                
                <div className="flex-1 hidden lg:flex flex-col items-center justify-center py-12 px-10 bg-black rounded-r-4xl">
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
                    <span className="text-[14px]  text-white my-8 font-light w-[250px] text-center"> Your premier digital library for borrowing and reading books.</span>
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
                        <h3 className="font-montserrat font-medium text-[23px] text-gray-900 text-center dark:text-white my-8 tracking-[12px]">Forget Password</h3>
                        <span className="w-full text-center mb-8 font-normal text-[14px] text-gray-700 dark:text-gray-300">Please enter your username</span>
                     <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                         {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email"
                            className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                        />
                       
                        <button 
                        type="submit"
                        className="w-full bg-black text-white text-center py-2 mt-5 font-medium rounded-lg hover:bg-black/80 transition-all duration-300 cursor-pointer">
                            {isLoading?<span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>:"Forget Password"}
                            
                            
                            </button>
                     </form>
                      <Link href={'/login'} className=" px-3 font-normal  text-center border border-black  text-black rounded-l-full transition-all duration-300 cursor-pointer absolute top-4 right-0">BACK</Link>
                
                    </div>

                    

                </div>
                
            </div>
        </div>      
        
    )
}