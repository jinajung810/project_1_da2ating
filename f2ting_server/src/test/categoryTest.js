const api = require('./apiTestRequester');

async function initTest() {
  //await getAllCategories();
  //await getCategory();
  //await createTier1Category();
  //await createTier2Category();
  //await updateTier1Category();
  //await updateTier2Category();
  //await updateTier2CategoryParent();
  //await deleteTier1Category();
  await deleteTier2Category();
}

async function getAllCategories() {
  try {
    const resData = await api.get('/api/categories');
    console.log('resData', resData)

  } catch (error) {
    console.log(error);
  }
}

async function getCategory() {
  try {
    const resData = await api.get('/api/categories/64a69e11907e2b011d7d0914');
    console.log('resData', resData)

  } catch (error) {
    console.log(error);
  }
}

async function createTier1Category() {
  try {
    await api.adminLogin();

    const data = {
      name: '테스트용 상위 카테고리41241241',
      order: 11
    }
    const resData = await api.post('/api/categories/tier1', data);
    console.log('resData', resData)

  } catch (error) {
    console.log(error);
  }
}

async function createTier2Category() {
  try {
    await api.adminLogin();

    const data = {
      name: '테스트용 하위 카테고리',
      order: 15,
      parentId: '64a69e11907e2b011d7d0914'
    }
    const resData = await api.post('/api/categories/tier2', data);
    console.log('resData', resData);

  } catch (error) {
    console.log(error);
  }
}

async function updateTier1Category() {
  try {
    await api.adminLogin();

    const data = {
      name: '샐러드',
      order: 8,
    }
    const resData = await api.put('/api/categories/tier1/64a69e11907e2b011d7d0914', data);
    console.log('resData', resData);

  } catch (error) {
    console.log(error);
  }
}

async function updateTier2Category() {
  try {
    await api.adminLogin();

    const data = {
      name: '샐러드 밑에 수정',
      order: 8,
    }
    const resData = await api.put('/api/categories/tier2/64a8f75df3e2141abbf7802c', data);
    console.log('resData', resData);

  } catch (error) {
    console.log(error);
  }
}

async function updateTier2CategoryParent() {
  try {
    await api.adminLogin();

    const data = {
      parentId: '64a69e264c640ac3edf67309'
    }
    const resData = await api.put('/api/categories/tier2/64a8f75df3e2141abbf7802c/parent', data);
    console.log('resData', resData);

  } catch (error) {
    console.log(error);
  }
}

async function deleteTier1Category() {
  try {
    await api.adminLogin();
    // 샐러드 "64a69e11907e2b011d7d0914"
    // 샌드위치 "64a69e20e3aff4f13ad88ea6"
    // 도시락 "64a69e264c640ac3edf67309"
    
    const resData = await api.delete('/api/categories/tier1/64a8f5cc99c7caf0f08c85b6');
    console.log('resData', resData);

  } catch (error) {
    console.log(error);
  }
}

async function deleteTier2Category() {
  try {
    await api.adminLogin();

    const resData = await api.delete('/api/categories/tier2/64a8f6d315221f0a15fb4c9a');
    console.log('resData', resData);

  } catch (error) {
    console.log(error);
  }
}

initTest();