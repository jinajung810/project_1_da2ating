const mongoose = require('mongoose');

const { api, utils, ERROR_CODE, createAppError } = require('../../libs');
const { CollectionName, ModelName } = require('../constants');
const Order = require('./model');
const OrderDetail = require('../orderDetail/model');
const Product = require('../product/model');

class OrderDAO {
  async getAllOrders(page, perPage) {
    const [total, orders] = await Promise.all([
      Order.countDocuments({}),
      Order.find({})
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);

    const totalPage = Math.ceil(total / perPage);

    return { orders, page, perPage, totalPage };
  }

  async getOrderDetail(id) {
    const orders = await Order.aggregate([
      [{
        $match: { _id: new mongoose.Types.ObjectId(id) }
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
    ])

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

  async createOrder(orderUserId, products, receiverName, receiverPhone, receiverAddress, deliveryMessage) {
    await api.withTransaction(async (session) => {

      // 금액관련 부분은 실제 결제 기능이 있다면 결제 로직에 맞춰서 수정해야 하지만
      // 현재는 결제 기능이 없기 때문에 자체적으로 최종 결제 금액을 계산하여 사용
      const productsData = await Product
                                    .find({ _id: { $in: products.map(item => item.id) }})
                                    .populate('thumbnail')
                                    .lean();

      if (products.length !== productsData.length) {
        throw createAppError(ERROR_CODE.badRequest, 'invalid param', 'createOrder - mismatch products.length');
      }

      const productInfos = products.map(item => {
        const productData = productsData.find(data => data._id.toString() === item.id);
        return {
          ...item,
          productData
        }
      });

      const totalProductPrice = productInfos.reduce((acc, cur) => {
        const productSalePrice = utils.calcProductSalePrice(cur.productData.originPrice, cur.productData.discountRate);
        return acc + (productSalePrice * cur.amount);
      }, 0);
      const deliveryPrice = utils.calcDeliveryPrice(totalProductPrice);

      const createOrderResult = await Order.create([{
        orderUser: orderUserId,
        totalProductPrice: totalProductPrice,
        deliveryPrice: deliveryPrice,
        receiverName: receiverName,
        receiverPhone: receiverPhone,
        receiverAddress: receiverAddress,
        deliveryMessage,
        productCount: productInfos.length,
        repProductName: productInfos[0].productData.name,
        repProductImage: productInfos[0].productData.thumbnail.path
      }], { session: session });

      const orderId = createOrderResult[0]._id;
      const orderDetails = productInfos.map(item => ({
        orderId: orderId,
        product: item.id,
        amount: item.amount,
        productPrice: item.productData.originPrice,
        productDiscountRate: item.productData.discountRate
      }));
      await OrderDetail.insertMany(orderDetails, { session });
    });
  }

  async updateOrderStatus(id, status) {
    await Order.updateOne({ _id: id }, { status })
  }

  async deleteOrder(id) {
    await api.withTransaction(async (session) => {
      await OrderDetail.deleteMany({ orderId: id }).session(session);
      await Order.deleteOne({ _id: id }).session(session);
    });
  }
}

module.exports = new OrderDAO();