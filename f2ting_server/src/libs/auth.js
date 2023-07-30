const jwt = require('jsonwebtoken');

const { ERROR_CODE, createAppError } = require('./appErrorMaker');

function auth(userType) {
  return (req, _, next) => {
    switch (userType) {
      case 'non-user': {
        authNonUser(req, next)
        break;
      }
      case 'member': {
        authMember(req, next);
        break;
      }
      case 'admin': {
        authAdmin(req, next);
        break;
      }
      default: {
        throw createAppError(ERROR_CODE.internalServerError, 'internalServerError', 'auth error - undefined user type');
      }
    }
  }
}

function authNonUser(req, next) {
  const token = req.headers.authorization;
  if (!(token === 'undefined' || token === 'null')) {
    throw createAppError(ERROR_CODE.unauthorized, 'unauthorized', 'only access non-user');
  }

  next();
}

function authMember(req, next) {
  try {
    const userInfo = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET_KEY);
    req.userInfo = userInfo;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createAppError(ERROR_CODE.unauthorized, 'unauthorized', 'only access member - token expired');
    } else if (error.name === "JsonWebTokenError") {
      throw createAppError(ERROR_CODE.unauthorized, 'unauthorized', 'only access member - invalid token');
    } else {
      throw error;
    }
  }
}

function authAdmin(req, next) {
  try {
    const userInfo = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET_KEY);
    if (userInfo.type !== 'admin') {
      throw createAppError(ERROR_CODE.unauthorized, 'unauthorized', 'only access admin');
    }
    req.userInfo = userInfo;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createAppError(ERROR_CODE.unauthorized, 'unauthorized', 'only access admin - token expired');
    } else if (error.name === "JsonWebTokenError") {
      throw createAppError(ERROR_CODE.unauthorized, 'unauthorized', 'only access admin - invalid token');
    } else {
      throw error;
    }
  }
}

module.exports = auth;