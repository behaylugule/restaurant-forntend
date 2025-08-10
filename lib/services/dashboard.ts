

import axios from '../axios'

export const dashboardService = {
getGlobalCount,
getKichenDisplay

}

async function getGlobalCount(){
    return await axios.get('/dashboard/count/')
}

async function getKichenDisplay(data:{page:number, page_size:number,status?:string}){
    return await axios.get('/orders/kitchen-display/',{
        params:{
            ...data
        }
    })
}