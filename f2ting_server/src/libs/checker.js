const { ERROR_CODE, createAppError } = require('./appErrorMaker');
const { EnumOrderStatus } = require('../db/constants');

class Checker {
  // Common
  #throwBadRequestAppError() {
    throw createAppError(ERROR_CODE.badRequest, 'invalid parameter');
  }

  #requiredString(str, errorLog) {
    if (typeof str !== 'string' || str.trim().length === 0) {
      console.error(errorLog);
      this.#throwBadRequestAppError();
    }
  }

  #requiredPositiveInteger(num, errorLog) {
    if (typeof num !== 'number' || !Number.isInteger(num) || num < 1) {
      console.error(errorLog);
      this.#throwBadRequestAppError();
    }
  }

  #requiredArray(arr, errorLog) {
    if (!Array.isArray(arr) || arr.length === 0) {
      console.error(errorLog);
      this.#throwBadRequestAppError();
    }
  }

  #requiredPhoneNumber(phoneNumber, errorLog) {
    const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regex.test(phoneNumber)) {
      console.error(errorLog);
      this.#throwBadRequestAppError();
    }
  }

  #requiredEmail(email, errorLog) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email.toLowerCase())) {
      console.error(errorLog);
      this.#throwBadRequestAppError();
    }
  }

  #requiredImageFile(image, errorLog) {
    const ALLOW_IMAGE_TYPE = ['image/png', 'image/jpg', 'image/jpeg'];
    if (image === null || image.mimetype === undefined || !ALLOW_IMAGE_TYPE.includes(image.mimetype)) {
      console.error(errorLog);
      this.#throwBadRequestAppError();
    }
  }
  // end Common

  // Default Checker
  checkEmailFormat(email) {
    this.#requiredEmail(email, `Fail - checkEmailFormat : ${email}`);
  }

  checkPhoneNumberFormat(phoneNumber) {
    this.#requiredPhoneNumber(phoneNumber, `Fail - checkPhoneNumberFormat : ${phoneNumber}`);
  }

  checkRequiredStringParams() {
    for (let i = 0; i < arguments.length; i++) {
      const param = arguments[i];
      this.#requiredString(param, `Fail - checkRequiredStringParams : ${i}`);
    }
  }

  checkRequiredStringArrayParams() {
    for (let i = 0; i < arguments.length; i++) {
      const array = arguments[i];
      this.#requiredArray(array, `Fail - checkRequiredStringArrayParams : ${i}`);

      for (let j = 0; j < array.length; j++) {
        const param = array[j];
        this.#requiredString(param, `Fail - checkRequiredStringArrayParams : ${i}`);
      }
    }
  }

  checkRequiredPositiveIntegerParams() {
    for (let i = 0; i < arguments.length; i++) {
      const param = arguments[i];
      this.#requiredPositiveInteger(Number(param), `Fail - checkRequiredPositiveIntegerParams : ${i}`);
    }
  }

  checkOptionalStringParams() {
    for (let i = 0; i < arguments.length; i++) {
      const param = arguments[i];
      if (param === undefined) continue;
      this.#requiredString(param, `Fail - checkOptionalStringParams : ${i}`);
    }
  }

  checkOptionalStringOrNullParams() {
    for (let i = 0; i < arguments.length; i++) {
      const param = arguments[i];
      if (param === undefined) continue;
      if (param === null || param === 'null') continue;
      this.#requiredString(param, `Fail - checkOptionalStringParams : ${i}`);
    }
  }

  checkOptionalPositiveIntegerParams() {
    for (let i = 0; i < arguments.length; i++) {
      const param = arguments[i];
      if (param === undefined) continue;
      this.#requiredPositiveInteger(Number(param), `Fail - checkOptionalPositiveIntegerParams : ${i}`);
    }
  }

  checkOptionalPositiveIntegerOrNullParams() {
    for (let i = 0; i < arguments.length; i++) {
      const param = arguments[i];
      if (param === undefined) continue;
      if (param === null || param === 'null') continue;
      this.#requiredPositiveInteger(Number(param), `Fail - checkOptionalPositiveIntegerParams : ${i}`);
    }
  }

  checkOptionalImageFileParams() {
    for (let i = 0; i < arguments.length; i++) {
      const param = arguments[i];
      if (param === undefined) continue;
      this.#requiredImageFile(param, `Fail - checkRequiredImageFile : ${i}`)
    }
  }

  checkRequiredImageFileArrayParams() {
    for (let i = 0; i < arguments.length; i++) {
      const array = arguments[i];
      this.#requiredArray(array, `Fail - checkRequiredImageFileArrayParams : ${i}`);

      for (let j = 0; j < array.length; j++) {
        const param = array[j];
        this.#requiredImageFile(param, `Fail - checkRequiredImageFileArrayParams : ${i}`)
      }
    }
  }

  checkOptionalImageFileArrayParams() {
    for (let i = 0; i < arguments.length; i++) {
      const array = arguments[i];
      if (array === undefined) continue;
      this.#requiredArray(array, `Fail - checkRequiredImageFileArrayParams : ${i}`);

      for (let j = 0; j < array.length; j++) {
        const param = array[j];
        this.#requiredImageFile(param, `Fail - checkRequiredImageFileArrayParams : ${i}`)
      }
    }
  }

  checkMaximumMBFileSize(mb, fileSize) {
    const mbToByte = mb * 1024 * 1024;
    if (fileSize === undefined || fileSize === null || typeof fileSize !== 'number' || mbToByte < fileSize) {
      console.error(`Fail - checkMaximumMBFileSize`);
      throw createAppError(ERROR_CODE.badRequest, 'invalid parameter');
    }
  }
  // end Default Checker

  // Special Checker
  checkOrderProductInfos(products) {
    this.#requiredArray(products, `Fail - checkOrderProductInfos`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      this.#requiredString(product.id, `Fail - checkOrderProductInfos : ${i}`);
      this.#requiredPositiveInteger(product.amount, `Fail - checkOrderProductInfos : ${i}`);
    }
  }

  checkUserPasswordFormat(str, length) {
    this.#requiredString(str, `Fail - checkUserPasswordFormat`);

    if (str.length < length) {
      console.error(`Fail - checkUserPasswordFormat`);
      this.#throwBadRequestAppError();
    }
  }

  checkAccessableAdminOrderStatus(status) {
    const enumStatusArr = Object.values(EnumOrderStatus);
    if (enumStatusArr.includes(status) === false) {
      console.error(`Fail - checkAccessableAdminOrderStatus`);
      this.#throwBadRequestAppError();
    }
  }
  // end Special Checker
}

module.exports = new Checker();