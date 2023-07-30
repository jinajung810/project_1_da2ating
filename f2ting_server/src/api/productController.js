const { api, auth, checker, fileUploader } = require('../libs');
const dao = require('../db/product/productDAO');

module.exports = (app) => {
  app.get   ('/api/products', getProducts);
  app.get   ('/api/products/best', getBestProducts);
  app.get   ('/api/products/new', getNewProducts);
  app.get   ('/api/products/:id', getProduct);
  app.post  ('/api/products', auth('admin'), fileUploader.fields([{ name: 'thumbnail' }, { name: 'descriptions' }]), createProduct);
  app.put   ('/api/products/:id', auth('admin'), fileUploader.fields([{ name: 'thumbnail' }, { name: 'descriptions' }]), updateProduct);
  app.delete('/api/products/:id', auth('admin'), deleteProduct);
}

async function getProducts(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { category, search } = req.query;

    checker.checkOptionalStringParams(category, search);

    return await dao.getProducts(category, search);
  });
}

async function getBestProducts(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    return await dao.getBestProducts();
  });
}

async function getNewProducts(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    return await dao.getNewProducts();
  });
}

async function getProduct(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;

    checker.checkRequiredStringParams(id);

    return await dao.getProduct(id);
  });
}

async function createProduct(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { name, originPrice, discountRate, tier1Category, tier2Category } = req.body;
    const { thumbnail, descriptions } = req.files;

    checker.checkRequiredStringParams(name, tier1Category);
    checker.checkRequiredPositiveIntegerParams(originPrice);
    checker.checkOptionalPositiveIntegerParams(discountRate);
    checker.checkOptionalStringParams(tier2Category);
    checker.checkRequiredImageFileArrayParams(thumbnail, descriptions);

    const _thumbnailFile = thumbnail[0];
    checker.checkMaximumMBFileSize(5, _thumbnailFile.size);
    descriptions.forEach(item => {
      checker.checkMaximumMBFileSize(10, item.size);
    });

    await dao.createProduct(name, originPrice, discountRate, tier1Category, tier2Category, _thumbnailFile, descriptions);
  });
}

async function updateProduct(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;
    const { name, originPrice, discountRate, tier1Category, tier2Category } = req.body;
    const { thumbnail, descriptions } = req.files;

    checker.checkRequiredStringParams(id);
    checker.checkOptionalStringParams(name, tier1Category);
    checker.checkOptionalPositiveIntegerParams(originPrice);
    checker.checkOptionalPositiveIntegerOrNullParams(discountRate);
    checker.checkOptionalStringOrNullParams(tier2Category);
    checker.checkOptionalImageFileArrayParams(thumbnail, descriptions);

    let _thumbnailFile = null;
    if (thumbnail !== undefined && thumbnail.length !== 0) {
      _thumbnailFile = thumbnail[0];
      checker.checkMaximumMBFileSize(5, _thumbnailFile.size);
    }

    if (descriptions !== undefined && descriptions.length !== 0) {
      descriptions.forEach(item => {
        checker.checkMaximumMBFileSize(10, item.size);
      });
    }

    await dao.updateProduct(id, name, originPrice, discountRate, tier1Category, tier2Category, _thumbnailFile, descriptions);
  });
}

async function deleteProduct(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;

    checker.checkRequiredStringParams(id);

    await dao.deleteProduct(id);
  });
}