const CollectionName = {
  products: 'products',
  categories: 'categories',
  orders: 'orders',
  orderDetails: 'orderDetails',
  users: 'users',
  files: 'files'
}
Object.freeze(CollectionName);

const ModelName = {
  product: 'Product',
  category: 'Category',
  order: 'Order',
  orderDetail: 'orderDetail',
  user: 'User',
  file: 'File'
}
Object.freeze(ModelName);

const EnumAccount = {
  default: 'default',
  google: 'google',
}
Object.freeze(EnumAccount);

const EnumUserType = {
  default: 'default',
  admin: 'admin',
}
Object.freeze(EnumUserType);

const EnumOrderStatus = {
  orderReceipt: 'order-receipt',
  deliveryStart: 'delivery-start',
  deliveryEnd: 'delivery-end',
  orderComplete: 'order-complete',
  canceledByAdmin: 'canceled-by-admin',
  canceledByUser: 'canceled-by-user',
}
Object.freeze(EnumOrderStatus);

module.exports = {
  CollectionName,
  ModelName,
  EnumAccount,
  EnumUserType,
  EnumOrderStatus
}