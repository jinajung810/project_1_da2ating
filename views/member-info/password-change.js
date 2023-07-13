const token = sessionStorage.getItem('token');
console.log(token)
const userPwError = document.querySelector('.userPwError');
const userPwConfirmError = document.querySelector('#pwError .userPwError');

const validatePassword = (newPw1) => {
  // 문자, 숫자, 특수문자 각각 최소 1개 이상, 8~16자리
  let valid = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
  return valid.test(newPw1);
};
//재설정할 비밀번호 입력 시 실행할 함수
const onPwInput = (e) => {
  if (!validatePassword(e.target.value)) {
    userPwError.textContent = '비밀번호 양식을 지켜주세요';
  } else {
    userPwError.textContent = '';
  }
};
//재설정할 비밀번호 확인 입력 시 실행할 함수
const onPwConfirmInput = (e) => {
  const userPw = document.querySelector('input[name="pw1"]');
  if (userPw.value !== e.target.value) {
    userPwConfirmError.textContent = '비밀번호가 일치하지 않습니다.';
    userPw.focus();
  } else {
    userPwConfirmError.textContent = '';
  }
};

//폼을 제출할 때 발생할 이벤트
const form = document.querySelector('.changePsw');
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const newPw1 = document.querySelector('input[name="pw1"]').value;
  const newPw2 = document.querySelector('input[name="pw2"]').value;

  if (newPw1 === '') {
    alert('비밀번호를 입력하세요.');
    return;
  } else if (newPw2 === '') {
    alert('비밀번호를 한번 더 입력하세요.');
    return;
  } else if (newPw1 !== newPw2) {
    alert('비밀번호를 확인해주세요.');
    return;
  } else {
    if (confirm('비밀번호를 변경하시겠습니까?')) {
      fetch('http://127.0.0.1:5555/api/users/my-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          password: newPw1
        })
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            alert('비밀번호가 변경되었습니다.');
            location.href = 'http://127.0.0.1:5500/mypage-view.html';
          } else {
            alert('비밀번호 변경에 실패하였습니다.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
}

const userPw = document.querySelector('input[name="pw1"]');
const userPwConfirm = document.querySelector('input[name="pw2"]');

userPw.addEventListener('input', onPwInput);
userPwConfirm.addEventListener('input', onPwConfirmInput);