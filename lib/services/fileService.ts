
import axios from "../axios"

export const fileService = {
uploadFile
}


async function uploadFile(data:FormData){
    return await axios.post('/upload/', data,{
        headers: {
        "Content-Type": "multipart/form-data",
    }})
}