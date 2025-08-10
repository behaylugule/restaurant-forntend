export interface MenuRateType{
    id?:number
    rate:number;
    menu:string
    shop:string
    user?:string
    username?:string
    menu_name?:string
    shop_name?:string
    comment?:string
    order?:string
}

export interface TotalMenuRate{
    total_order:number
    average_rate:number
}