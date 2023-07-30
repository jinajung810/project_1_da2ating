const { api, convertFileToFileSchema, ERROR_CODE, createAppError } = require('../../libs');
const Category = require('./model');
const File = require('../file/model');
const Product = require('../product/model');

class CategoryDAO {
  async getAllCategories() {
    const resData = await Category
                            .find({})
                            .populate('bannerImage')
                            .sort('order')
                            .lean();
    return resData;
  }

  async getCategory(id) {
    const category = await Category
                            .findOne({ _id: id })
                            .populate('bannerImage')
                            .lean();
    return category;
  }

  async createTier1Category(name, order, bannerImage) {
    await api.withTransaction(async (session) => {
      const fileData = convertFileToFileSchema(bannerImage);
      let fileId = null;
      if (fileData !== undefined) {
        const createFileResult = await File.create([{ ...fileData }], { session: session });
        fileId = createFileResult[0]._id;
      }

      await Category.create([{ name, order, bannerImage: fileId }], { session: session });
    });
  }

  async createTier2Category(name, order, parentId, bannerImage) {
    await api.withTransaction(async (session) => {
      const category = await Category.findOne({ _id: parentId, parentId: null }).lean();
      if (category === null) {
        throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'createTier2Category - category is null');
      }

      const fileData = convertFileToFileSchema(bannerImage);
      let fileId = null;
      if (fileData !== undefined) {
        const createFileResult = await File.create([{ ...fileData }], { session: session });
        fileId = createFileResult[0]._id;
      }

      await Category.create([{ name, order, parentId, bannerImage: fileId }], { session: session });
    });
  }

  async updateTier1Category(id, name, order, bannerImage, isDeleteBannerImage) {
    await api.withTransaction(async (session) => {
      const category = await Category.findOne({ _id: id, parentId: null }).lean();
      if (category === null) {
        throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'updateTier1Category - category is null');
      }

      if (bannerImage !== undefined) {
        const fileData = convertFileToFileSchema(bannerImage);
        const createFileResult = await File.create([{ ...fileData }], { session: session });
        const fileId = createFileResult[0]._id;

        await Category.updateOne(
          { _id: id },
          {
            name,
            order,
            bannerImage: fileId
          }
        ).session(session);

        return;
      }

      await Category.updateOne(
        { _id: id },
        {
          name,
          order,
          bannerImage: (isDeleteBannerImage === true || isDeleteBannerImage === 'true') ? null : undefined
        }
      ).session(session);
    });
  }

  async updateTier2Category(id, name, order, bannerImage, isDeleteBannerImage) {
    await api.withTransaction(async (session) => {
      const category = await Category.findOne({ _id: id, parentId: { $ne: null } }).lean();
      if (category === null) {
        throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'updateTier2Category - category is null');
      }

      if (bannerImage !== undefined) {
        const fileData = convertFileToFileSchema(bannerImage);
        const createFileResult = await File.create([{ ...fileData }], { session: session });
        const fileId = createFileResult[0]._id;

        await Category.updateOne(
          { _id: id },
          {
            name,
            order,
            bannerImage: fileId
          }
        ).session(session);

        return;
      }

      await Category.updateOne(
        { _id: id },
        {
          name,
          order,
          bannerImage: (isDeleteBannerImage === true || isDeleteBannerImage === 'true') ? null : undefined
        }
      ).session(session);
    });
  }

  async updateTier2CategoryParent(id, parentId) {
    await api.withTransaction(async (session) => {
      const tier2Category = await Category.findOne({ _id: id, parentId: { $ne: null } }).lean();
      if (tier2Category === null) {
        throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'updateTier2CategoryParent - tier2Category is null');
      }

      if (tier2Category.parentId.toString() === parentId) {
        throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'updateTier2CategoryParent - same parent id');
      }

      const tier1Category = await Category.findOne({ _id: parentId, parentId: null }).lean();
      if (tier1Category === null) {
        throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'updateTier2CategoryParent - tier1Category is null');
      }

      await Category.updateOne({ _id: id }, { parentId }).session(session);
      await Product.updateMany({ tier2Category: id }, { tier1Category: parentId }).session(session);
    });
  }

  async deleteTier1Category(id) {
    const category = await Category.findOne({ _id: id, parentId: null }).lean();
    if (category === null) {
      throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'deleteTier1Category - category is null');
    }

    const childCategories = await Category.find({ parentId: id }).lean();
    if (childCategories.length !== 0) {
      throw createAppError(ERROR_CODE.internalServerError, 'exist child categories', 'deleteTier1Category - exist child categories');
    }

    const products = await Product.find({ tier1Category: id }).lean();
    if (products.length !== 0) {
      throw createAppError(ERROR_CODE.internalServerError, 'exist products', 'deleteTier1Category - exist products');
    }

    await Category.deleteOne({ _id: id });
  }

  async deleteTier2Category(id) {
    const category = await Category.findOne({ _id: id, parentId: { $ne: null } }).lean();
    if (category === null) {
      throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'deleteTier2Category - category is null');
    }

    const products = await Product.find({ tier2Category: id }).lean();
    if (products.length !== 0) {
      throw createAppError(ERROR_CODE.badRequest, 'exist products', 'deleteTier2Category - exist products');
    }

    await Category.deleteOne({ _id: id });
  }
}

module.exports = new CategoryDAO();