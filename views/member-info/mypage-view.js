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
  
  const userName = document.querySelector('#my-info-name');
  const email = document.querySelector('#my-info-email');
  const phone = document.querySelector('#my-info-phone');
  const address = document.querySelector('#my-info-addr');

  let addr = '';
  if (userInfo.zipCode !== null) addr += `(${userInfo.zipCode})`;
  if (userInfo.address !== null) addr += ` ${userInfo.address}`;
  if (userInfo.detailAddress !== null) addr += ` ${userInfo.detailAddress}`;

  userName.textContent = userInfo.name;
  email.textContent = userInfo.email;
  phone.textContent = userInfo.phone || '없음';
  address.textContent = addr.length !== 0 ? addr : '없음';
}