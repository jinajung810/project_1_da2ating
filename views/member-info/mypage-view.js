
const token = sessionStorage.getItem('token');
const isLoggedIn = token !== null && isValidToken(token);

async function fetchTest() {
  try {
    const res = await fetch('http://127.0.0.1:5555/api/users/my-info', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${token}`
      },
    });
    const data = await res.json();
    console.log('data', data);
    memberView(data);
  } catch (error) {
    console.error('get 에러 발생', error);
  }
}

fetchTest();

function memberView(data) {
  const userName = document.querySelector('.userName');
  const email = document.querySelector('.email');
  const phone = document.querySelector('.phone');
  const address = document.querySelector('.address');

  userName.innerText = data.name;
  email.innerText = data.email;
  phone.innerText = data.phone;
  address.innerText = data.address;
}

function changeInfo() {
  window.location.href = 'http://127.0.0.1:5500/f2ting_client/src/views/member-info/info-change.html';
}