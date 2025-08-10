import axios  from '../axios';
import { ChangePasswordType, User } from '@/type/user';

export const userService = {
    registerUser,
    login,
    logout,
    getCurrentUser,
    changePassword,
    getUsers,
    forgetPassword,
    resetPassword,
    updateProfile
}
 function registerUser (userData:any){
    return  axios.post('/register/',userData)
   
}

async function login (data:{username:string , password:string}){
    
    return await axios.post('/token/',data)
}

async function getCurrentUser(){
    return await axios.get('/me/')
}

async function changePassword(data:ChangePasswordType){
    return await axios.put('/change-password/',data)
}

async function getUsers(data:any){
    return await axios.get('/users/',{
        params:{
            ...data
        }
    })
}

async function forgetPassword(email:string){
    return await axios.post('/password-reset/',{email})
}

async function resetPassword(data:{password:string, token:string}){
    return await axios.post(`/password-reset/confirm/?token=${data.token}` ,data)
}

async function updateProfile(data:User){
    return await axios.patch(`/update-profile/${data.id}/`,data)
}







async function logout(){
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    window.location.href = '/login'
}

