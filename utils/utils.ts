


export const params = {
    page :10,
    search:''
}

export enum USER_ROLE {
    ADMIN ='admin',
    ORGANIZATION_ADMIN = 'organization_admin',
    SHOP_ADMIN = 'shop_admin',
    CUSTOMER = 'customer',
    USER = 'user'
}

export enum ORDER_STATUS{
    PENDING ='pending',
    PROCESSING = 'processing',
    READY = 'ready',
    COMPLETED ='completed',
    CANCLED ='cancled',
}

export enum  MESSAGE_SENDER{
      USER='user',
      SYSTEM = 'system'
}
export const host = process.env.NEXT_PUBLIC_API_STATIC