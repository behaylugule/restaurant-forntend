import { ShopType } from "@/type/shops.model";
import axios from "../axios";

export const shopService = {

    getShops,
    getShop,
    addShop,
    updateShop,
    deleteShop,
    getShopsForClient,
    
}


async function getShops(filterData:any){
    return await axios.get('/shops/',{params:{...filterData}})
}
;
async function getShop(id:string){
    return await axios.get(`/shops/${id}/`)
}

async function addShop(data:ShopType){
    return await axios.post('/shops/', data)
}

async function updateShop(data:ShopType) {
  return await axios.patch(`/shops/${data.id}/`,data)    
}

async function  deleteShop(id:string) {
    return await axios.delete(`/shops/${id}/`)
    
}

async function getShopsForClient({page,page_size,search}:{page:number,page_size:number,search:string}) {
       return await axios.get('/client/shops/',{params:{page,page_size,search}})
}
