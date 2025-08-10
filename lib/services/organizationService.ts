
import { params } from "@/utils/utils"
import axios from "../axios"



export const organizationsService ={
    getOrganization,
    getOrganizations,
    addOrganizations,
    updateOrganizations,
    deleteOrganizations,
    getOrganizationsCountWithCategory
}
function getOrganizations(data:any){
    return axios.get("/organizations/", {params:{...data}})

}

function getOrganization(id:string){
    return axios.get("/organizations/"+id)
}

function addOrganizations(book:any){
    return axios.post("/organizations/",book)
}

function updateOrganizations(book:any){
    return axios.patch("/organizations/"+book.id +"/",book)
}

function deleteOrganizations(id:string){
    return axios.delete("/organizations/"+id +"/")
}

async function getOrganizationsCountWithCategory({page,search='',page_size}:{page:number,search:string,page_size:number}){
    return await axios.get('/books/count-by-category/',{params:{page,page_size,search}})
}