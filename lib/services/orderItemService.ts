import { params } from '@/utils/utils'
import axios from '../axios'


export const orderItemService = {
    getOrderItems,
}

async function getOrderItems(data:{page:number,page_size:number,search:string,order_id?:string}){
   return await axios.get('/orders/order-items/',{
    params:{
        ...data
    }
   })
}