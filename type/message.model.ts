export interface ChatRoomType{
    id?:string,
    shop:string,
    client:string,
    shop_name?:string,
    client_name?:string
}

export interface MessageType{
    room?:string
    sender:string
    text:string
    username?:string
    create_date?:string
}