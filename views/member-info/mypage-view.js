initMypageView();

function initMypageView() {
  const token = sessionStorage.getItem('token');
  
  if (token === null) {
    alert('로그인이 필요합니다.');
    location.href = '../login/login.html';
    return;
  }

  memberView();
}

// 회원정보 조회 함수
async function memberView() {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  
  const userName = document.querySelector('.userName');
  const email = document.querySelector('.email');
  const phone = document.querySelector('.phone');
  const address = document.querySelector('.address');

  userName.value = userInfo.name;
  email.value = userInfo.email;
  phone.value = userInfo.phone || '없음';
  address.value = userInfo.address || '없음';
}