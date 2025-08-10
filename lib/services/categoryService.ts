import { CategoryModel } from "@/type/category.model";
import axios from "@/lib/axios";


export const categoryService ={
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    getMenuCategoriesForClient
}
async function createCategory(data:CategoryModel) {
    return await axios.post('/categories/',data)  
}

async function getCategories({page,page_size,search=''}:{page:number,page_size:number,search:string}) {
    return await axios.get('/categories/',{params:{page,search,page_size}})
}

async function getCategory(id:string){
    return await axios.get(`/categories/${id}/`)
}
async function updateCategory(id:string,data:CategoryModel){
    return await axios.patch(`/categories/${id}/`,data)
}

async function deleteCategory(id:string){
    return await axios.delete(`/categories/${id}/`)
}

async function getMenuCategoriesForClient(data:{id:string,page:number,page_size:number,search:string}){
  return await axios.get(`/client/categories/${data.id}`,
    {
        params:{
            page:data.page,
            search:data.search,
            page_size:data.page_size
        }
    }
  )
}