export interface MenuType {
    id?:string
  name:string
  description:string
  image:string
  shop?:string
  menu_category:string
  is_active?:boolean;
  menu_category_name?:string;
  shop_name?:string
  image_url?:string
  price?:number
  preparation_time?:number

}

export interface MenuFilterType {
  search?: string;
  menu_category?:string
}
