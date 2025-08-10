export interface CategoryModel {
    id?: string;
    name: string;
    description: string
    image:string
    image_url?:string
    shop_name?:string
    shop?:string
    create_date:Date | string
    update_date:Date | string
    
}