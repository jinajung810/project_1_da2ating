const jwt = require('jsonwebtoken');

const { api, auth, checker, hashPassword, utils } = require('../libs');
const { EnumAccount } = require('../db/constants');
const dao = require('../db/user/userDAO');

module.exports = (app) => {
  app.get   ('/api/users', auth('admin'), getAllUsers);
  app.post  ('/api/users/login', auth('non-user'), login);
  app.post  ('/api/users/sign-up', auth('non-user'), signUp);
  app.post  ('/api/users/sign-up/duplicated-email-check', auth('non-user'), checkDuplicatedEmail);
  app.get   ('/api/users/my-info', auth('member'), getMyInfo);
  app.put   ('/api/users/my-info', auth('member'), updateMyInfo);
  app.delete('/api/users/my-info', auth('member'), deleteMyInfo);
  app.get   ('/api/users/my-orders', auth('member'), getMyOrders);
  app.get   ('/api/users/my-orders/:orderId', auth('member'), getMyOrder);
  app.put   ('/api/users/my-orders/:orderId', auth('member'), updateMyOrder);
  app.put   ('/api/users/my-orders/:orderId/cancel', auth('member'), cancelMyOrder);
  //app.post('/api/users/admin-sign-up', adminSignUp);
}

async function getAllUsers(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const resData = await dao.getAllUsers();
    return resData;
  });
}

async function login(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { email, password } = req.body;

    checker.checkRequiredStringParams(email);

    const _email = email.toLowerCase();
    checker.checkEmailFormat(_email);
    checker.checkUserPasswordFormat(password, 4);

    const hashedPassword = hashPassword(password);

    const resData = await dao.login(EnumAccount.default, _email, hashedPassword);
    if (resData !== null) {
      const userInfo = utils.parseUserInfo(resData);
      const token = jwt.sign({
        type: 'JWT',
        id: resData._id,
        type: resData.type,
      }, process.env.TOKEN_SECRET_KEY);
      return { token, userInfo }
    } else {
      return null;
    }
  });
}

async function signUp(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { email, password, name } = req.body;

    checker.checkRequiredStringParams(email, name);

    const _email = email.toLowerCase();
    checker.checkEmailFormat(_email);
    checker.checkUserPasswordFormat(password, 4);

    const hashedPassword = hashPassword(password);

    await dao.signUp(EnumAccount.default, _email, hashedPassword, name);
  });
}

async function checkDuplicatedEmail(req, res, next) {
  return await api.defaultProcess(req, res, next, async () => {
    const { email } = req.body;

    checker.checkRequiredStringParams(email);

    const _email = email.toLowerCase();
    checker.checkEmailFormat(_email);

    return await dao.checkDuplicatedEmail(EnumAccount.default, _email);
  });
}

async function getMyInfo(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const resData = await dao.getMyInfo(req.userInfo.id);
    return utils.parseUserInfo(resData);
  });
}

async function updateMyInfo(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const id = req.userInfo.id;
    const { password, name, address, phone } = req.body;

    checker.checkRequiredStringParams(id);
    checker.checkOptionalStringParams(password, name);
    checker.checkOptionalStringOrNullParams(address, phone);
    if (phone !== undefined && phone !== null) {
      checker.checkPhoneNumberFormat(phone);
    }

    let hashedPassword = null;
    if (password !== undefined) {
      hashedPassword = hashPassword(password);
    }

    await dao.updateMyInfo(id, hashedPassword, name, address, phone);
  });
}

async function deleteMyInfo(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const id = req.userInfo.id;
    await dao.deleteMyInfo(id);
  });
}

async function getMyOrders(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const id = req.userInfo.id;
    const { page, perPage } = req.query;

    checker.checkOptionalPositiveIntegerParams(page, perPage);

    const _page = Number(page || 1);
    const _perPage = Number(perPage || 10);

    const resData = await dao.getMyOrders(id, _page, _perPage);
    return resData;
  });
}

async function getMyOrder(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const userId = req.userInfo.id;
    const { orderId } = req.params;

    checker.checkRequiredStringParams(orderId);

    const resData = await dao.getMyOrder(userId, orderId);
    return resData;
  });
}

async function updateMyOrder(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const userId = req.userInfo.id;
    const { orderId } = req.params;

    const { receiverName, receiverPhone, receiverAddress, deliveryMessage } = req.body;

    checker.checkRequiredStringParams(orderId);
    checker.checkOptionalStringParams(receiverName, receiverPhone, receiverAddress);
    checker.checkOptionalStringOrNullParams(deliveryMessage);

    if (receiverPhone !== undefined) {
      checker.checkPhoneNumberFormat(receiverPhone);
    }

    await dao.updateMyOrder(userId, orderId, receiverName, receiverPhone, receiverAddress, deliveryMessage);
  });
}

async function cancelMyOrder(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const userId = req.userInfo.id;
    const { orderId } = req.params;

    checker.checkRequiredStringParams(orderId);

    await dao.cancelMyOrder(userId, orderId);
  });
}

// 필요한 상황에서만 스크립트로 실행
//async function adminSignUp(req, res, next) {
//  await api.defaultProcess(req, res, next, async () => {
//    const { email, password, name } = req.body;

//    checker.checkRequiredStringParams(email, name);

//    const _email = email.toLowerCase();
//    checker.checkEmailFormat(_email);
//    checker.checkUserPasswordFormat(password, 4);

//    const hashedPassword = hashPassword(password);

//    await dao.adminSignUp(EnumAccount.default, _email, hashedPassword, name);
//  });
//}