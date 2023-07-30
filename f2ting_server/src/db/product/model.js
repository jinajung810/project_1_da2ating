const mongoose = require('mongoose');

const { CollectionName, ModelName } = require('../constants');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    originPrice: {
      type: Number,
      required: true
    },
    discountRate: {
      type: Number,
      default: null
    },
    tier1Category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: ModelName.category
    },
    tier2Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.category,
      default: null
    },
    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: ModelName.file
    },
    descriptions: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: ModelName.file
    }],
  },
  {
    timestamps: true,
    collection: CollectionName.products,
  }
);

module.exports = mongoose.model(ModelName.product, ProductSchema);