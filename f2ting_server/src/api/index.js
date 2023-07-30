const express = require('express');

const { ERROR_CODE, createAppError } = require('../libs');

const productController = require('./productController');
const categoryController = require('./categoryController');
const orderController = require('./orderController');
const userController = require('./userController');

function initApi(app) {
  productController(app);
  categoryController(app);
  orderController(app);
  userController(app);

  // 이미지 처리
  app.use('/public', express.static('public'));

  app.use((req, res, next) => {
    const error = createAppError(ERROR_CODE.notFound, 'Resource not found');
    next(error);
  });

  app.use((error, req, res, next) => {
    const errorLog = error.log || error.message;
    console.error('errorLog', errorLog);

    const err_code = error.statusCode || ERROR_CODE.internalServerError;
    res.status(err_code);
    res.json({
      error: error.message
    });
  });
}

module.exports = initApi;
