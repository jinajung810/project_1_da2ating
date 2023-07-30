const mongoose = require('mongoose');

const { CollectionName, ModelName } = require('../constants');

const FileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: CollectionName.files,
  }
);

module.exports = mongoose.model(ModelName.file, FileSchema);