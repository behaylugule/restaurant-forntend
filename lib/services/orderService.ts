import axios from '../axios'


export const  orderService = {
    addOrder,
    getOrders,
    getOrder,
    orderDetailDo
}
async function addOrder(data:any){
    return await axios.post('/orders/',data)
}
async function getOrder(id:string){
    return await axios.get(`/orders/${id}/`)
}

async function getOrders(data:any){
    return await axios.get('/orders/', {
        params:{
          ...data
        }
    })
}

async function orderDetailDo(id:string, method:string,payload?:any){
    return await axios.patch(`/orders/${id}/`,payload,{
        params:{
            method:method
        }
    })
}