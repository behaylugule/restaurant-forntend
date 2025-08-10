import { MenuRateType } from '@/type/menurate.model'
import axios from '../axios'
import { params } from '@/utils/utils'



export const menuRateService = {
    getMenuRate,
    createMenuRate,
    updateMenuRate,
    menuRateDo
}

async function getMenuRate(data:{page:number,page_size?:number,search?:string, order_id?:string,menu_id?:string}){
    return await axios.get('/orders/menu-rates/',{
        params:{page:data.page,page_size:data.page_size, 
            search:data.search,order_id:data.order_id,
            menu_id:data.menu_id
        }})
}

async function createMenuRate(menuRate:MenuRateType){
    return await axios.post('/orders/menu-rates/',menuRate)
}

async function updateMenuRate(id:number, menuRate:MenuRateType){
    return await axios.patch(`/orders/menu-rates/${id}`,menuRate)
}

async function menuRateDo(method:string,payload:any){
    return await axios.patch('/orders/menu-rates/', payload,{params:{
        method:method 
    }})
}