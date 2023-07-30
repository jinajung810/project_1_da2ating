class Utils {
  removeStringSpace(str) {
    return str.replace(/ /g, '');
  }

  parseUserInfo(userInfo) {
    return {
      _id: userInfo._id,
      account: userInfo.account,
      email: userInfo.email,
      name: userInfo.name,
      address: userInfo.address,
      phone: userInfo.phone,
      type: userInfo.type,
      createdAt: userInfo.createdAt
    }
  }

  calcProductSalePrice(price, discountRate) {
    if (discountRate === null) return price;
    return price - (price * discountRate / 100);
  }

  calcDeliveryPrice(productPrice) {
    const deliveryPrice = 3000;
    const freeDeliveryStandardAmount = 50000;

    if (freeDeliveryStandardAmount <= productPrice) {
      return 0;
    } else {
      return deliveryPrice;
    }
  }
}

module.exports = new Utils();