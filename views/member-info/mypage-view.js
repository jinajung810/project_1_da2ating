
// 마이페이지-회원정보 조회
// 토큰 가져오기
const token = sessionStorage.getItem('token');

// 토큰 유효성 검사 함수
function isValidToken(token) {
  return token !== null && token !== undefined && token.trim() !== '';
}

if (isValidToken(token)) {
  fetchMemberInfo();
} else {
  // 로그인되지 않은 상태 처리
  console.log('로그인되지 않은 상태입니다.');
}
// 회원정보 조회 함수
async function fetchMemberInfo() {
  try {
    const response = await fetch('http://127.0.0.1:5555/api/users/my-info', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log('회원정보:', data);
      // 회원정보를 화면에 표시하는 함수 호출
      memberView(data);
    } else {
      // 회원정보 조회 실패 처리
      console.error('회원정보 조회 실패');
    }
  } catch (error) {
    console.error('회원정보 조회 에러:', error);
  }
}

// 회원정보를 화면에 표시하는 함수
function memberView(data) {
  const userName = document.querySelector('.userName');
  const email = document.querySelector('.email');
  const phone = document.querySelector('.phone');
  const address = document.querySelector('.address');

  userName.innerText = `${data.name}`;
  email.innerText = `${data.email}`;
  phone.innerText = `${data.phone}`;
  address.innerText = `${data.address}`;
}

function changeInfo() {
  window.location.href = 'http://127.0.0.1:5500/views/member-info/info-change.html';
}
