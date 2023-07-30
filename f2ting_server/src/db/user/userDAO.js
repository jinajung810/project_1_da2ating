const mongoose = require('mongoose');

const { api, ERROR_CODE, createAppError } = require('../../libs');
const { CollectionName, ModelName, EnumOrderStatus } = require('../constants');
const User = require('./model');
const Order = require('../order/model');

class UserDAO {
  async getAllUsers() {
    const resData = await User
                            .find({})
                            .sort({ 'createdAt': -1 })
                            .lean();
    return resData;
  }

  async login(account, email, password) {
    const userInfo = await User
                            .findOne({ account, email, password })
                            .lean();
    return userInfo;
  }

  async signUp(account, email, password, name) {
    const isExists = await User.findOne({ account, email });
    if (isExists) {
      throw createAppError(ERROR_CODE.internalServerError, 'duplicated email', 'signUp - duplicated email');
    }

    await User.create({
      account, email, password, name
    });
  }

  async checkDuplicatedEmail(account, email, password, name) {
    const user = await User.findOne({ account, email });
    if (user === null) {
      return { isExists: false }
    } else {
      return { isExists: true }
    }
  }

  async getMyInfo(id) {
    const resData = await User
                            .findOne({ _id: id })
                            .lean();
    return resData;
  }

  async updateMyInfo(id, password, name, address, phone) {
    if (password !== null) {
      await User.updateOne({ _id: id }, { password, name, address, phone });
    } else {
      await User.updateOne({ _id: id }, { name, address, phone });
    }
  }

  async deleteMyInfo(id) {
    await User.deleteOne({ _id: id });
  }

  async getMyOrders(id, page, perPage) {
    const ObjectId = new mongoose.Types.ObjectId(id);

    const [total, orders] = await Promise.all([
      Order.countDocuments({ orderUser: ObjectId }),
      Order.find({ orderUser: ObjectId })
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);

    const totalPage = Math.ceil(total / perPage);

    return { orders, page, perPage, totalPage };
  }

  async getMyOrder(userId, orderId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const orderObjectId = new mongoose.Types.ObjectId(orderId);

    const orders = await Order.aggregate([
      [{
        $match: { _id: orderObjectId, orderUser: userObjectId }
      },
      {
        $lookup: {
          from: CollectionName.orderDetails,
          localField: '_id',
          foreignField: 'orderId',
          as: 'orderDetails',
        }
      },
      {
        $limit: 1
      }]
    ]);

    if (orders.length === 0) {
      return null;
    }

    const populateQuery = [
      {
        path: 'orderDetails.product',
        model: ModelName.product,
        populate: {
          path: "thumbnail",
          model: 'File',
          select: 'path'
        },
        select: 'name thumbnail'
      },
    ];

    const resData = await Order.populate(orders, populateQuery);
    return resData[0];
  }

  async updateMyOrder(userId, orderId, receiverName, receiverPhone, receiverAddress, deliveryMessage) {
    const orderData = await Order.findOne({ _id: orderId });
    if (orderData === null) {
      throw createAppError(ERROR_CODE.badRequest, 'data not found', 'updateMyOrder - orderData null');
    }

    if (orderData.orderUser.toString() !== userId) {
      throw createAppError(ERROR_CODE.unauthorized, 'unauthorized', 'updateMyOrder - unauthorized');
    }

    if (orderData.status !== EnumOrderStatus.orderReceipt) {
      throw createAppError(ERROR_CODE.badRequest, 'badRequest', 'updateMyOrder - badRequest');
    }

    await Order.updateOne({ _id: orderId, orderUser: userId }, { receiverName, receiverPhone, receiverAddress, deliveryMessage });
  }

  async cancelMyOrder(userId, orderId) {
    const orderData = await Order.findOne({ _id: orderId });
    if (orderData === null) {
      throw createAppError(ERROR_CODE.badRequest, 'data not found', 'updateMyOrder - orderData null');
    }

    if (orderData.orderUser.toString() !== userId) {
      throw createAppError(ERROR_CODE.unauthorized, 'unauthorized', 'updateMyOrder - unauthorized');
    }

    if (orderData.status !== EnumOrderStatus.orderReceipt) {
      throw createAppError(ERROR_CODE.badRequest, 'badRequest', 'updateMyOrder - badRequest');
    }

    await Order.updateOne({ _id: orderId, orderUser: userId }, { status: EnumOrderStatus.canceledByUser });
  }

  // 필요한 상황에서만 스크립트로 실행
  //async adminSignUp(account, email, password, name) {
  //    const isExists = await User.findOne({ account, email });
  //    if (isExists) {
  //      throw createAppError(ERROR_CODE.internalServerError, 'duplicated email', 'adminSignUp - duplicated email');
  //    }

  //    await User.create({
  //      account, email, password, name, type: 'admin'
  //    });
  //}
}

module.exports = new UserDAO();