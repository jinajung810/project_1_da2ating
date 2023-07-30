const { api, auth, checker, utils } = require('../libs');
const dao = require('../db/order/orderDAO');

module.exports = (app) => {
  app.get   ('/api/orders', auth('admin'), getAllOrders);
  app.get   ('/api/orders/:id', auth('admin'), getOrderDetail);
  app.post  ('/api/orders', auth('member'), createOrder);
  app.put   ('/api/orders/:id', auth('admin'), updateOrderStatus);
  app.delete('/api/orders/:id', auth('admin'), deleteOrder);
}

async function getAllOrders(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { page, perPage } = req.query;

    checker.checkOptionalPositiveIntegerParams(page, perPage);

    const _page = Number(page || 1);
    const _perPage = Number(perPage || 50);

    const resData = await dao.getAllOrders(_page, _perPage);
    return resData;
  });
}

async function getOrderDetail(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;

    checker.checkRequiredStringParams(id);

    const resData = await dao.getOrderDetail(id);
    return resData;
  });
}

async function createOrder(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { products, receiverName, receiverPhone, receiverAddress, deliveryMessage } = req.body;

    checker.checkOrderProductInfos(products);
    checker.checkRequiredStringParams(receiverName, receiverAddress);
    checker.checkPhoneNumberFormat(receiverPhone);
    checker.checkOptionalStringParams(deliveryMessage);

    await dao.createOrder(req.userInfo.id, products, receiverName, receiverPhone, receiverAddress, deliveryMessage);
  });
}

async function updateOrderStatus(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {

    const { id } = req.params;
    const { status } = req.body;

    checker.checkRequiredStringParams(id);
    checker.checkAccessableAdminOrderStatus(status);

    await dao.updateOrderStatus(id, status);
  });
}

async function deleteOrder(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;

    checker.checkRequiredStringParams(id);

    await dao.deleteOrder(id);
  });
}