import axios from '../axios'


export const chatService =  {
  getMessages,
  getChatRooms
}

async function getMessages(data:{page:number,page_size?:number,search?:string, room_id?:string}){
    return axios.get('/messages/',{params:{
        ...data
    }})
}

async function getChatRooms(data:{page:number,page_size?:number, search?:string,shop_id?:string}){
  return axios.get('/chat-rooms/',{
    params:{
      ...data
    }
  })
}