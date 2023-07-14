const token = sessionStorage.getItem('token');
const isLoggedIn = isValidToken(token);

// 로그인되지 않은 상태 처리
if (!isLoggedIn) {
  let answer = confirm("로그인이 필요한 페이지입니다.");
  if (answer === true) {
    location.href = 'http://127.0.0.1:5500/views/login/login.html';
  } else {
    location.href = 'http://127.0.0.1:5500/views/main/main.html';
  }
} else {
  // 회원 정보 수정 로직 실행
  const infoForm = document.querySelector('.changeInfo');
  const addressCodeBtn = document.querySelector('#addressCodeBtn');
  const addressCodeInput = document.querySelector('#addressCode');
  const addressBasicInput = document.querySelector('#addressBasic');
  const addressDetailInput = document.querySelector('#addressDetail');

  // 유효한 토큰일 경우에만 정보 요청 후 화면에 출력
  infoForm.addEventListener('submit', handleInfoSubmit);
  addressCodeBtn.addEventListener('click', DaumPostcode);

  getInfo();

  async function getInfo() {
    const response = await fetch('http://127.0.0.1:5555/api/users/my-info', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('회원정보', data);

      document.querySelector('.userName').value = data.userName;
      document.querySelector('.email').value = data.userEmail;
      document.querySelector('.phone1').value = data.phone;
      addressCodeInput.value = data.addressCode;
      addressBasicInput.value = data.addressBasic;
      addressDetailInput.value = data.addressDetail;
    } else {
      console.error('회원정보 조회 실패');
    }
  }

  async function handleInfoSubmit(event) {
    event.preventDefault();

    const userName = document.querySelector('.userName').value;
    const userEmail = document.querySelector('.email').value;
    const phone = document.querySelector('.phone1').value;
    const addressCode = addressCodeInput.value;
    const addressBasic = addressBasicInput.value;
    const addressDetail = addressDetailInput.value;

    const data = {
      userName,
      userEmail,
      phone,
      addressCode,
      addressBasic,
      addressDetail,
    };

    try {
      const response = await fetch('http://127.0.0.1:5555/api/users/my-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('회원 정보를 수정했습니다.');
        location.href = 'http://127.0.0.1:5500/f2ting_client/src/views/member-info/mypage-view.html';
      } else {
        alert('회원 정보 수정 실패');
      }
    } catch (error) {
      console.error('회원 정보 수정 에러', error);
    }
  }

  function DaumPostcode() {
    new daum.Postcode({
      oncomplete: function(data) {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }

          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }

          document.getElementById('sample6_extraAddress').value = extraAddr;
        } else {
          document.getElementById('sample6_extraAddress').value = '';
        }

        addressCodeInput.value = data.zonecode;
        addressBasicInput.value = addr;
        addressDetailInput.focus();
      }
    }).open();
  }
}
