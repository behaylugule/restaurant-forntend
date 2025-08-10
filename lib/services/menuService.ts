import { MenuType } from "@/type/menu.model";
import axios from "../axios";
import { params } from "@/utils/utils";

export const menuService = {

    getMenus,
    getMenu,
    addMenu,
    updateMenu,
    deleteMenu,
    getMuenubyRestorantId
}


async function getMenus(data:any){
    return await axios.get('/menu/',{params:{...data}})
}
;
async function getMenu(id:string){
    return await axios.get(`/menu/${id}/`)
}

async function addMenu(data:MenuType){
    return await axios.post('/menu/', data)
}

async function updateMenu(data:MenuType) {
  return await axios.patch(`/menu/${data.id}/`,data)    
}

async function  deleteMenu(id:string) {
    return await axios.delete(`/menu/${id}/`)
    
}

async function getMuenubyRestorantId(data:{id:string,category_id:string,page:number,page_size:number,search:string}) {

    return await axios.get(`/client/menus/${data.id}`     
    ,{params:{    
        category_id:data.category_id,
        page:data.page,
        page_size:data.page_size,
        search:data.search}})}