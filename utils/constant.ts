import { ORDER_STATUS, USER_ROLE } from "./utils";

export const USER_ROLE_OPTIONS = [
  { value: USER_ROLE.ADMIN, label: 'Admin' },
  { value: USER_ROLE.ORGANIZATION_ADMIN, label: 'Organization Admin' },
  { value: USER_ROLE.SHOP_ADMIN, label: 'Shop Admin' },
  { value: USER_ROLE.CUSTOMER, label: 'Customer' },
  { value: USER_ROLE.USER, label: 'User' },
];

export const ORDER_STATUS_OPTION = [
  {value: ORDER_STATUS.PENDING, label:'pending'},
  {value:ORDER_STATUS.PROCESSING,label:'processing'},
  {value:ORDER_STATUS.READY, label:'ready'},
  {value:ORDER_STATUS.COMPLETED, label:'completed'},
  {value:ORDER_STATUS.CANCLED, label:'cancled'}
]
