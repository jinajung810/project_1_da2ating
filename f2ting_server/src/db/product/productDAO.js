const { api, convertFileToFileSchema, ERROR_CODE, createAppError } = require('../../libs');
const { CollectionName, ModelName } = require('../constants');
const Product = require('./model');
const Category = require('../category/model');
const File = require('../file/model');
const OrderDetail = require('../orderDetail/model');

class ProductDAO {
  async getProducts(categoryId, search) {
    const findOptions = {}

    if (categoryId !== undefined) {
      const category = await Category.findOne({ _id: categoryId }).lean();

      if (category === null) {
        throw createAppError(ERROR_CODE.badRequest, 'invalid parameter', 'getProducts - category is null');

      } else if (category.parentId === null) {
        findOptions.tier1Category = categoryId;

      } else {
        findOptions.tier2Category = categoryId;

      }
    }

    if (search !== undefined) {
      findOptions.name = { $regex: `${search}` }
    }

    const resData = await Product
                            .find(findOptions)
                            .sort({ 'createdAt': -1 })
                            .populate('tier1Category')
                            .populate('tier2Category')
                            .populate('thumbnail')
                            .populate('descriptions')
                            .lean();

    return resData;
  }

  async getBestProducts() {
    const bestProducts = await OrderDetail.aggregate([
      {
        $group: {
          _id: '$product',
          count: {
            $sum: '$amount'
          }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 4
      },
      {
        $lookup: {
          from: CollectionName.products,
          localField: '_id',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      {
        $unwind: '$productInfo'
      },
      {
        $project: {
          createdAt: '$productInfo.createdAt',
          descriptions: '$productInfo.descriptions',
          discountRate: '$productInfo.discountRate',
          name: '$productInfo.name',
          originPrice: '$productInfo.originPrice',
          thumbnail: '$productInfo.thumbnail',
          tier1Category: '$productInfo.tier1Category',
          tier2Category: '$productInfo.tier2Category',
          _id: '$productInfo._id',
        }
      }
    ]);

    const populateQuery = [
      {
        path: 'tier1Category',
        model: ModelName.category
      },
      {
        path: 'tier2Category',
        model: ModelName.category
      },
      {
        path: 'thumbnail',
        model: ModelName.file
      },
      {
        path: 'descriptions',
        model: ModelName.file
      }
    ];

    //const resData = await Product.populate(bestProducts, populateQuery);
    const resData = await OrderDetail.populate(bestProducts, populateQuery);
    return resData;
  }

  async getNewProducts() {
    const resData = await Product
                            .find({})
                            .sort({ 'createdAt': -1 })
                            .limit(4)
                            .populate('tier1Category')
                            .populate('tier2Category')
                            .populate('thumbnail')
                            .populate('descriptions')
                            .lean();

    return resData;
  }

  async getProduct(id) {
    const resData = await Product
                            .findOne({ _id: id })
                            .populate('tier1Category')
                            .populate('tier2Category')
                            .populate('thumbnail')
                            .populate('descriptions')
                            .lean();
    return resData;
  }

  async createProduct(name, originPrice, discountRate, tier1Category, tier2Category, thumbnail, descriptions) {
    await api.withTransaction(async (session) => {
      const thumbnailData = convertFileToFileSchema(thumbnail);
      const createThumbnailDataResult = await File.create([{ ...thumbnailData }], { session: session });
      const thumbnailFileId = createThumbnailDataResult[0]._id;

      const descriptionsData = descriptions.map(item => convertFileToFileSchema(item));
      const createDescriptionsDataResult = await File.create(descriptionsData, { session: session });
      const descriptionFileIds = createDescriptionsDataResult.map(item => item._id);

      await Product.create([{
        name,
        originPrice,
        discountRate,
        tier1Category,
        tier2Category,
        thumbnail: thumbnailFileId,
        descriptions: descriptionFileIds
      }], { session: session });
    });
  }

  async updateProduct(id, name, originPrice, discountRate, tier1Category, tier2Category, thumbnail, descriptions) {
    await api.withTransaction(async (session) => {

      let thumbnailFileId = null;
      if (thumbnail !== undefined) {
        const thumbnailData = convertFileToFileSchema(thumbnail);
        const createThumbnailDataResult = await File.create([{ ...thumbnailData }], { session: session });
        thumbnailFileId = createThumbnailDataResult[0]._id;
      }

      let descriptionFileIds = null;
      if (descriptions !== undefined) {
        const descriptionsData = descriptions.map(item => convertFileToFileSchema(item));
        const createDescriptionsDataResult = await File.create(descriptionsData, { session: session });
        descriptionFileIds = createDescriptionsDataResult.map(item => item._id);
      }

      await Product.updateOne(
        { _id: id },
        {
          name,
          originPrice,
          discountRate: (discountRate === null || discountRate === 'null') ? null : discountRate,
          tier1Category,
          tier2Category: (tier2Category === null || tier2Category === 'null') ? null : tier2Category,
          thumbnail: thumbnailFileId,
          descriptions: descriptionFileIds
        }
      ).session(session);
    });
  }

  async deleteProduct(id) {
    await Product.deleteOne({ _id: id });
  }
}

module.exports = new ProductDAO();