const { api, auth, checker, fileUploader } = require('../libs');
const dao = require('../db/category/categoryDAO');

module.exports = (app) => {
  app.get   ('/api/categories', getAllCategories);
  app.get   ('/api/categories/:id', getCategory);
  app.post  ('/api/categories/tier1', auth('admin'), fileUploader.single('bannerImage'), createTier1Category);
  app.post  ('/api/categories/tier2', auth('admin'), fileUploader.single('bannerImage'), createTier2Category);
  app.put   ('/api/categories/tier1/:id', auth('admin'), fileUploader.single('bannerImage'), updateTier1Category);
  app.put   ('/api/categories/tier2/:id', auth('admin'), fileUploader.single('bannerImage'), updateTier2Category);
  app.put   ('/api/categories/tier2/:id/parent', auth('admin'), updateTier2CategoryParent);
  app.delete('/api/categories/tier1/:id', auth('admin'), deleteTier1Category);
  app.delete('/api/categories/tier2/:id', auth('admin'), deleteTier2Category);
}

async function getAllCategories(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const resData = await dao.getAllCategories();

    const upperCategories = resData.filter(item => item.parentId === null).map(item => ({ ...item, children: [] }));
    const lowerCategories = resData.filter(item => item.parentId !== null);

    lowerCategories.forEach(item => {
      const parentIndex = upperCategories.findIndex(parent => parent._id.toString() === item.parentId.toString());
      upperCategories[parentIndex].children.push(item);
    });

    return upperCategories;
  });
}

async function getCategory(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;

    checker.checkRequiredStringParams(id);

    const resData = await dao.getCategory(id);
    return resData;
  });
}

async function createTier1Category(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { name, order } = req.body;
    const bannerImage = req.file;

    checker.checkRequiredStringParams(name);
    checker.checkOptionalPositiveIntegerParams(order);
    checker.checkOptionalImageFileParams(bannerImage);

    await dao.createTier1Category(name, order, bannerImage);
  });
}

async function createTier2Category(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { name, order, parentId } = req.body;
    const bannerImage = req.file;

    checker.checkRequiredStringParams(name, parentId);
    checker.checkOptionalPositiveIntegerParams(order);
    checker.checkOptionalImageFileParams(bannerImage);

    await dao.createTier2Category(name, order, parentId, bannerImage);
  });
}

async function updateTier1Category(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;
    const { name, order, isDeleteBannerImage } = req.body;
    const bannerImage = req.file;

    checker.checkRequiredStringParams(id);
    checker.checkOptionalStringParams(name);
    checker.checkOptionalPositiveIntegerParams(order);
    checker.checkOptionalImageFileParams(bannerImage);

    await dao.updateTier1Category(id, name, order, bannerImage, isDeleteBannerImage);
  });
}

async function updateTier2Category(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;
    const { name, order, isDeleteBannerImage } = req.body;
    const bannerImage = req.file;

    checker.checkRequiredStringParams(id);
    checker.checkOptionalStringParams(name);
    checker.checkOptionalPositiveIntegerParams(order);
    checker.checkOptionalImageFileParams(bannerImage);

    await dao.updateTier2Category(id, name, order, bannerImage, isDeleteBannerImage);
  });
}

async function updateTier2CategoryParent(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;
    const { parentId } = req.body;

    checker.checkRequiredStringParams(id, parentId);

    await dao.updateTier2CategoryParent(id, parentId);
  });
}

async function deleteTier1Category(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;

    checker.checkRequiredStringParams(id);

    await dao.deleteTier1Category(id);
  });
}

async function deleteTier2Category(req, res, next) {
  await api.defaultProcess(req, res, next, async () => {
    const { id } = req.params;

    checker.checkRequiredStringParams(id);

    await dao.deleteTier2Category(id);
  });
}