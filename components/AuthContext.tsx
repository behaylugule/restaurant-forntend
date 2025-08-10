'use client'
import React, { createContext, useContext, useState,useEffect} from 'react';
import { userService } from '@/lib/services/userService';
import toast from 'react-hot-toast';

interface AuthContextProps {
    user:any,
    accessToken:string | null,
    isAuthenticated: boolean,
    login:(token:string)=> void,
    logout:()=> void, 
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children}:{children:React.ReactNode})=>{
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)
     
    useEffect(()=>{
const token = localStorage.getItem('access')
if(token){
    setAccessToken(token)
   userService.getCurrentUser().then(response=>{
        setUser(response.data.data)
    }).catch(error=>{
        console.error('Failed to fetch current user:', error)
        setUser(null)
    })      
}
    },[])

    const login = (token:string)=>{
        setAccessToken(token)
        userService.getCurrentUser().then(response=>{
            setUser(response.data.data)
        }).catch(error=>{
            toast.error('failed to fetch current user')
        })
    }

    const logout = ()=>{
      localStorage.removeItem('access')
      setAccessToken(null)
      setUser(null)
    }


    const isAuthenticated = !!accessToken

    return (
        <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(context == undefined){
        throw new Error('useAuth must be used within an Authprovider')

    }
    return context
}



