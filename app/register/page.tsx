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

    const { register, handleSubmit, formState:{errors}} = useForm<User>();
    const [isLoading,setIsLoading]= useState<boolean>(false)
    const {isAuthenticated} = useAuth()
    const router = useRouter()
    const onSubmit = async (data:any)=>{
        setIsLoading(true)
       userService.registerUser(data).then((res:any)=>{
        
          setIsLoading(false)
          toast.success("Uder has registered successfully")
           router.push('/login')
        }).catch((error:any)=>{
             
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
            <div className="w-full lg:w-3/4 xl:w-1/2 bg-transparent lg:bg-white flex justify-between">
                
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
                    <span className="text-[14px] text-white my-8 font-normal"> New to our platform? Sign In now.</span>
                    <Link href={'/login'} className="py-2 px-16 text-center border border-white text-white rounded-lg hover:bg-white    /80 transition-all duration-300 cursor-pointer">Sign In</Link>
                </div>

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
                        <h3 className="font-montserrat font-medium text-[23px] text-gray-900 text-center dark:text-white my-8 tracking-[12px]">Create Account</h3>
                        <span className="w-full text-center mb-8 font-normal text-[14px] text-gray-700 dark:text-gray-300">Please enter your details to create an account</span>
                     <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <input 
                            type="text" 
                            id="username"
                            {...register("username", { required:"Username is required" })}
                            
                            placeholder="Username"
                            className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                        />
                        {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Email"
                            className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        <input
                            type="password"
                           id="password"
                           {...register("password", { required:"Password is required"})}
                            placeholder="Password"
                            className="w-full h-10 px-4 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
                        />
                       
                        <button 
                        type="submit"
                        className="w-full bg-black text-white text-center py-2 mt-5 font-medium rounded-lg hover:bg-black/80 transition-all duration-300 cursor-pointer">
                            {isLoading?<span className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>:"Sign Up"}
                            
                            
                            </button>
                              <Link href={'/login'} className="block lg:hidden self-start text-[14px] text-gray-700 mt-3 ">You do have account <span className="font-medium">Sign In</span>  here</Link>
         
                     </form>
                    </div>

                    

                </div>
                
            </div>
        </div>      
        
    )
}