initMypageInfoChangePage();

function initMypageInfoChangePage() {
  const token = sessionStorage.getItem('token');

  if (token === null) {
    alert('로그인이 필요합니다.');
    location.href = '../login/login.html';
    return;
  }

  infoView();
}

function infoView() {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  document.querySelector('.userName').value = userInfo.name;
  document.querySelector('.email').value = userInfo.email;
  document.querySelector('.phone1').value = userInfo.phone || '';

  // 회원 정보 수정 로직 실행
  const infoForm = document.querySelector('.changeInfo');
  const addressCodeBtn = document.querySelector('#addressCodeBtn');
  const addressCodeInput = document.querySelector('#addressCode');
  const addressBasicInput = document.querySelector('#addressBasic');
  const addressDetailInput = document.querySelector('#addressDetail');
  
  // 유효한 토큰일 경우에만 정보 요청 후 화면에 출력
  infoForm.addEventListener('submit', handleInfoSubmit);
  addressCodeBtn.addEventListener('click', DaumPostcode);
}

async function handleInfoSubmit(event) {
  event.preventDefault();

  const userName = document.querySelector('.userName').value;
  const userEmail = document.querySelector('.email').value;
  const phone = document.querySelector('.phone1').value;
  //const addressCode = addressCodeInput.value;
  //const addressBasic = addressBasicInput.value;
  //const addressDetail = addressDetailInput.value;

  const data = {
    name: userName,
    email: userEmail,
    phone: phone,
  };

  const token = sessionStorage.getItem('token');

  try {
    const response = await fetch('http://127.0.0.1:5555/api/users/my-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      const newUserInfo = {
        ...userInfo,
        name: userName,
        email: userEmail,
        phone: phone,
      }
      sessionStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      alert('회원 정보를 수정했습니다.');
      location.href = './mypage-view.html';
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

function changePassword() {
  alert('todo')
  //const pwd = document.querySelector('#userPw').value;
}