import axios from '../axios'



export const reportsService = {
    generateOrderReport,
    generateOrderDetail,
    generateMenuReport,
    generateShopReport,
    generateOrgReport,
    generateUsersReport
}
async function generateOrderReport(data:any){
    return await axios.patch('/reports/orders/',{
        ...data
    })
}

async function generateOrderDetail(order_id:string){
    return await axios.get(`/reports/orders/${order_id}/`)
}

async function generateMenuReport(data:any){
    return await axios.patch('/reports/menus/',{
        ...data
    })
}


async function generateShopReport(data:any){
    return await axios.patch('reports/shops/', data)
}

async function generateOrgReport(data:any){
    return await axios.patch('reports/organizations/',data)
}

async function generateUsersReport(data:any){
    return await axios.patch('reports/users/',data)
}