export interface ShopType{

    id?:string
    name:string
    code?:string
    shop_key?:string
    description:string
    organization:string
    shop_logo:string
    logo_url?:string
    location?:[number,number]
    lng?:number
    lat?:number
    organization_name?:string
    address?:string

}

export interface ShopFilterType{
    search?:string
}