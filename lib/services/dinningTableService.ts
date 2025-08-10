import { DinningTableType } from "@/type/dinning-table.model";
import axios from "../axios";



export const diningTableService = {
    getDiningTables,
    addDiningTables,
    deleteDiningTable,
    updateDiningTable,
    getDiningTable
}


async function getDiningTables(data:{page:number, page_size:number, search:string, shop_id?:string}){
    return await axios.get('/dining-tables/',{
        params:{
            ...data
        }
    })
}

async function getDiningTable(id:string){
    return await axios.get(`/dining-tables/${id}/`)
}


async function addDiningTables(payload:DinningTableType) {
    return await axios.post('/dining-tables/',payload)
    
}

async function deleteDiningTable(id:string){
    return await axios.delete(`/dining-tables/${id}/`)
}

async function updateDiningTable(id:string,payload:DinningTableType){
    return await axios.put(`/dining-tables/${id}/`,payload)
}