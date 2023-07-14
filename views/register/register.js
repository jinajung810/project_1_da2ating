const API_BASE_URL = 'http://kdt-sw-5-team02.elicecoding.com';

// 회원가입 정보
const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');
const userPw = document.querySelector('#userPw');
const userPwConfirm = document.querySelector('#userPwConfirm');

// 회원가입 error
const userNameError = document.querySelector('#name-error');
const userEmailError = document.querySelector('#email-error');
const userPwError = document.querySelector('#pw-error');
const userPwConfirmError = document.querySelector('#pwconfirm-error');

const submitButton = document.querySelector('#submitButton');

// 회원가입 유효성 검사(이메일, 비밀번호)
const validateEmail = (email) => {
  //(알파벳,숫자)@(알파벳,숫자).(알파벳,숫자)
  let valid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  return valid.test(email);
};

const validatePassword = (pw) => {
  //문자, 숫자, 특수문자 각각 최소 1개 이상, 8~16자리
  let valid = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

  return valid.test(pw);
};

// 이메일 중복검사
const emailDoubleCheck = async () => {
  const userData = {
    email: userEmail.value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: null,
    },
    body: JSON.stringify(userData),
  };

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/users/sign-up/duplicated-email-check`,
      options
    );
    const data = await res.json();
    console.log(userEmail.value, data);
    // 가입 성공 시 페이지 이동
    if (res.ok) {
      return data.data.isExists;
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
  }
};

// input 유효성 이벤트
const onEmailInput = (e) => {
  if (!validateEmail(e.target.value)) {
    userEmailError.textContent = '올바른 이메일을 입력해주세요';
    userEmail.focus();
  } else {
    userEmailError.textContent = '';
  }
};

const onPwInput = (e) => {
  if (!validatePassword(e.target.value)) {
    userPwError.textContent = '비밀번호 양식을 지켜주세요';
    userEmail.focus();
  } else {
    userPwError.textContent = '';
  }
};

const onPwConfirmInput = (e) => {
  if (userPw.value !== e.target.value) {
    userPwConfirmError.textContent = '비밀번호가 일치하지 않습니다.';
    userPw.focus();
  } else {
    userPwConfirmError.textContent = '';
  }
};

// 회원가입
const onSubmit = async (e) => {
  e.preventDefault();

  if (userName.value === '') {
    //userNameError.textContent = '이름을 입력하세요.';
    alert('이름을 입력하세요.');
    userName.focus();
    return;
  } else if (userEmail.value === '') {
    //userEmailError.textContent = '이메일을 입력하세요.';
    alert('이메일을 입력하세요.');
    userEmail.focus();
    return;
  } else if (userPw.value === '') {
    //userPwError.textContent = '비밀번호를 입력하세요.';
    alert('비밀번호를 입력하세요.');
    userPw.focus();
    return;
  } else if (userPwConfirm.value === '') {
    //userPwError.textContent = '비밀번호를 한번 더 입력하세요.';
    alert('비밀번호를 한번 더 입력하세요.');
    userPwConfirmError.focus();
    return;
  } else if (userPw.value !== userPwConfirm.value) {
    return;
  } else if (!validateEmail(userEmail.value)) {
    console.log(!validateEmail(userEmail.value));
    return;
  } else if (!validatePassword(userPw.value)) {
    return;
  }
  
  
  const isExists = await emailDoubleCheck();
  if (isExists === true || isExists === null || isExists === undefined) {
    alert('중복된 이메일입니다.');
    return;
  }
  
  
  
  
  
  

  // 유효성 검사 통과시 회원가입 api 요청
  const userData = {
    email: userEmail.value,
    password: userPw.value,
    name: userName.value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: null,
    },
    body: JSON.stringify(userData),
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/users/sign-up`, options);

    // 가입 성공 시 페이지 이동
    if (res.ok) {
      alert('회원가입이 완료되었습니다.');
      location.href = '../login/login.html'
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
  }
};

submitButton.addEventListener('click', onSubmit);
userEmail.addEventListener('change', onEmailInput);
userPw.addEventListener('change', onPwInput);
userPwConfirm.addEventListener('change', onPwConfirmInput);
