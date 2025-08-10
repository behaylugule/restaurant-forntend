export interface User {
    id?: string | null;
    name?: string | null;
    email: string;
    first_name?:string;
    middle_name?:string;
    last_name?:string;
    username: string;
    password?: string;
    role:string;
    contact_number?:string;
    organization?:string;
    shop?:string
    org_name?:string
    shop_name?:string
}

export interface ChangePasswordType{
       old_password:string
       confirm_password:string
       new_password:string
}

export interface UserFilterType{
    search?:string,
    role?:string
}