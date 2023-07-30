const createError = require('http-errors');

const ERROR_CODE = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  tokenExpired: 419,
  internalServerError: 500,
}

function createAppError(errorCode, messageForClient, logForServer) {
  return createError(errorCode, messageForClient, { log: logForServer });
}

module.exports = {
  ERROR_CODE,
  createAppError
}