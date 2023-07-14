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

  document.querySelector('.info-input-name').value = userInfo.name;
  document.querySelector('.info-input-phone').value = userInfo.phone || '';
  document.querySelector('#addressCode').value = userInfo.zipCode || '';
  document.querySelector('#addressBasic').value = userInfo.address || '';
  document.querySelector('#addressDetail').value = userInfo.detailAddress || '';
}

async function changeInfo() {
  const userName = document.querySelector('.info-input-name').value;
  const phone = document.querySelector('.info-input-phone').value;
  const addressCode = document.querySelector('#addressCode').value;
  const addressBasic = document.querySelector('#addressBasic').value;
  const addressDetail = document.querySelector('#addressDetail').value;

  const data = {
    name: userName,
    phone: phone,
    zipCode: addressCode,
    address: addressBasic,
    detailAddress: addressDetail
  };

  const token = sessionStorage.getItem('token');

  try {
    const response = await fetch('http://kdt-sw-5-team02.elicecoding.com/api/users/my-info', {
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
        phone: phone,
        zipCode: addressCode,
        address: addressBasic,
        detailAddress: addressDetail
      }
      sessionStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      alert('회원 정보를 수정했습니다.');
      location.href = './mypage-view.html';
    } else {
      alert('유효하지 않은 값이 있습니다.');
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
      }

      document.querySelector('#addressCode').value = data.zonecode;
      document.querySelector('#addressBasic').value = addr;
      document.querySelector('#addressDetail').focus();
    }
  }).open();
}

async function changePassword() {
  const pwd = document.querySelector('#userPw').value;
  const pwd2 = document.querySelector('#userPwConfirm').value;
  
  //문자, 숫자, 특수문자 각각 최소 1개 이상, 8~16자리
  const valid = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

  if (valid.test(pwd) === false) {
    alert('비밀번호는 문자, 숫자, 특수문자 각각 최소 1자리, 8~16자리로 입력해주세요.');
    return;
  }

  if (pwd !== pwd2) {
    alert('비밀번호가 서로 일치하지 않습니다.');
    return;
  }

  const data = {
    password: pwd,
  };

  const token = sessionStorage.getItem('token');

  try {
    const response = await fetch('http://kdt-sw-5-team02.elicecoding.com/api/users/my-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('비밀번호를 수정했습니다.');
      location.href = './mypage-view.html';
    } else {
      alert('유효하지 않은 값이 있습니다.');
    }
  } catch (error) {
    console.error('회원 정보 수정 에러', error);
  }
}