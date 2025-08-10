import { OrderItemType } from "./orderitem.model"

export interface OrderType {
    create_date:Date | string
    id:string
    shop:string
    shop_name:string
    status:string
    total_price:string
    update_date:string
    user:string
    username:string
    table_number?:string
    table_number_no?:string
    table_number_name?:string
    order_items?:OrderItemType[]
}

export interface OrderFilterType{
    id?:string,
    status?:string
    search?:string
    order_date?:string
}