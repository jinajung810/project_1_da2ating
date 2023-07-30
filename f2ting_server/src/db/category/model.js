const mongoose = require('mongoose');

const { CollectionName, ModelName } = require('../constants');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      default: 10
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    bannerImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelName.file,
      default: null
    }
  },
  {
    timestamps: true,
    collection: CollectionName.categories,
  }
);

module.exports = mongoose.model(ModelName.category, CategorySchema);