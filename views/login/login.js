const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const submitInput = document.querySelector('#submitInput');

// 로그인 버튼 클릭
submitInput.addEventListener('click', async (event) => {
  event.preventDefault(); // 폼 제출의 기본 동작 중지

  const email = emailInput.value;
  const password = passwordInput.value;

  // 잘 입력했는지 확인
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  if (!isEmailValid || !isPasswordValid) {
    return alert('이메일 형태와 비밀번호가 맞는지 확인해 주세요.');
  }

  // 로그인 요청
  try {
    const response = await fetch(
      'http://kdt-sw-5-team02.elicecoding.com/api/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: null,
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    // 서버 응답 처리
    if (data.data !== null) {
      // 로그인 성공
      sessionStorage.setItem('token', data.data.token);
      sessionStorage.setItem('userInfo', JSON.stringify(data.data.userInfo));
      alert(`로그인되었습니다.`);

      window.location.href = '/';
    } else {
      // 로그인 실패
      console.log('로그인 실패:', data.error);
      alert(`로그인에 실패했습니다.`);
    }
  } catch (error) {
    console.error('에러 발생:', error);
    alert(
      `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error.message}`
    );
  }
});
