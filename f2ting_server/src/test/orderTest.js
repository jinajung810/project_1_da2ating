const fetch = require('node-fetch');
const HOST = 'http://127.0.0.1:5555';

async function initTest() {
  //await getAllOrders();
  await createOrder();
}

async function getAllOrders() {
  const url = HOST + '/api/orders';

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await fetch(encodeURI(url), options);
    const data = await res.json();
    console.log('data', data)

  } catch (error) {
    console.log(error);
  }
}

async function createOrder() {
  const url = HOST + '/api/orders';

  const data = {
    products: [
      {
        id: '64a6a2bed53938f861ef134a',
        amount: 12
      },
      //{
      //  id: '64a6a278d53938f861ef1348',
      //  amount: 1
      //},
    ],
    receiver: {
      name: '두번째 주문자임',
      phone: '010-9351-5126',
      address: '주소11111111111111111111'
    },
    //deliveryMessage: '',
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log('data', data)

  } catch (error) {
    console.log(error);
  }
}

initTest();