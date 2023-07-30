const mongoose = require('mongoose');

const { CollectionName, ModelName, EnumOrderStatus } = require('../constants');

const OrderSchema = new mongoose.Schema(
  {
    orderUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.user,
      required: true
    },
    totalProductPrice: {
      type: Number,
      required: true
    },
    deliveryPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: [
        EnumOrderStatus.orderReceipt,
        EnumOrderStatus.deliveryStart,
        EnumOrderStatus.deliveryEnd,
        EnumOrderStatus.orderComplete,
        EnumOrderStatus.canceledByAdmin,
        EnumOrderStatus.canceledByUser
      ],
      default: EnumOrderStatus.orderReceipt
    },
    deliveryMessage: {
      type: String,
      default: null
    },
    receiverName: {
      type: String,
      required: true
    },
    receiverPhone: {
      type: String,
      required: true
    },
    receiverAddress: {
      type: String,
      required: true
    },
    productCount: {
      type: Number,
      required: true
    },
    repProductName: {
      type: String,
      required: true
    },
    repProductImage: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    collection: CollectionName.orders,
  }
);

module.exports = mongoose.model(ModelName.order, OrderSchema);