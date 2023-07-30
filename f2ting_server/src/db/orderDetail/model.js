const mongoose = require('mongoose');

const { CollectionName, ModelName } = require('../constants');

const OrderDetailSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.product,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    productPrice: {
      type: Number,
      required: true
    },
    productDiscountRate: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true,
    collection: CollectionName.orderDetails,
  }
);

module.exports = mongoose.model(ModelName.orderDetail, OrderDetailSchema);