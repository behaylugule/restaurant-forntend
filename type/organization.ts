

export interface OrganizationsCreateModel {
  id?:string
  name:string;
  code:string;
  description:string;
  address?:string;
  website?:string;
  contact_number?:string;
  create_date?:string;
  update_date?:string
}

export interface OrganizationsCountModel{
  category_id:string;
  category_name:string;
  number_of_book:number
}

export interface OrganizationFilterType {
  search?:string
}
