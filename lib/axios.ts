import axios from 'axios'
import toast from 'react-hot-toast'


const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const api = axios.create({
    baseURL:apiBaseUrl
})


api.interceptors.request.use(
    (config)=>{
        console.log("base URL",apiBaseUrl)
        if(typeof window !=='undefined'){
            const token = localStorage.getItem('access')
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
        }

          // Ensure Content-Type is set for POST, PUT, PATCH requests
        if (
            config.method === 'post' ||
            config.method === 'put' ||
            config.method === 'patch'
        ) {
            if (!config.headers['Content-Type']) {
                config.headers['Content-Type'] = 'application/json'
            }
        }
        return config
    },
    (error)=>Promise.reject(error)
)

api.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originalRequest = error.config
        if(error.response?.status===401 &&!originalRequest._retry){
            originalRequest._retry = true;
            try {
                const refresh = localStorage.getItem('refresh')
                const res = await axios.post(apiBaseUrl+'/token/refresh')
                localStorage.setItem('access',res.data.access)
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`
            } catch (error) {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                window.location.href = '/login'
            }
        }
        console.log("Error response:", error.response)
       toast.error(error.response?.data?.message || 'An error occurred')
        return Promise.reject(error)
    }
)

export default api  