const fetch = require('node-fetch');
const HOST = 'http://127.0.0.1:5555';

async function initTest() {
  //await getAllUsers();
  await login();
  //await adminLogin();
  //await signUp();
  //await adminSignUp();
}

async function getAllUsers() {
  const url = HOST + '/api/users';

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

async function login() {
  const url = HOST + '/api/users/login';

  const data = {
    email: 'test1@test.com',
    password: '1234',
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
    console.log('res', res)
    const data = await res.json();
    console.log('data', data)

  } catch (error) {
    console.log(error);
  }
}

async function adminLogin() {
  const url = HOST + '/api/users/login';

  const data = {
    email: 'admin@admin.com',
    password: '1234',
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
    console.log('res', res)
    const data = await res.json();
    console.log('data', data)

  } catch (error) {
    console.log(error);
  }
}

async function signUp() {
  const url = HOST + '/api/users/sign-up';

  const data = {
    email: 'test2@test.com',
    password: '1234',
    name: '테스트유저2',
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
    console.log('res', res)

  } catch (error) {
    console.log(error);
  }
}

async function adminSignUp() {
  const url = HOST + '/api/users/admin-sign-up';

  const data = {
    email: 'admin@admin.com',
    password: '1234',
    name: '관리자',
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
    console.log('res', res)

  } catch (error) {
    console.log(error);
  }
}

initTest();