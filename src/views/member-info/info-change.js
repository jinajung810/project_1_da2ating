
// 마이페이지-회원정보 조회
const token = sessionStorage.getItem('token');
const isLoggedIn = token !== null && isValidToken(token);

const form = document.querySelector('.changeInfo');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const idInput = form.querySelector('[name=id]');
  const userNameInput = form.querySelector('[name=userName]');
  const email1Input = form.querySelector('[name=email1]');
  const email2Input = form.querySelector('[name=email2]');
  const phone1Input = form.querySelector('[name=phone1]');
  const phone2Input = form.querySelector('[name=phone2]');
  const phone3Input = form.querySelector('[name=phone3]');
  const addressInput = form.querySelector('[name=address]');

  if (isLoggedIn) {
    const id = idInput.value;
    const userName = userNameInput.value;
    const email = `${email1Input.value}@${email2Input.value}`;
    const phone = `${phone1Input.value}-${phone2Input.value}-${phone3Input.value}`;
    const address = `${addressInput.value}`

    fetch('http://127.0.0.1:5555/api/users/my-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: id,
        userName: userName,
        email: email,
        phone: phone,
        address: address
      })
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert('회원정보가 수정되었습니다.');
          window.location.href = 'http://127.0.0.1:5500/mypage-view.html';
        } else {
          alert('회원정보 수정에 실패하였습니다. 다시 시도해주세요.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else {
    let answer = confirm('로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까?');
    if (answer === true) {
      // 로그인 페이지로 이동합니다.
      window.location.href = 'http://127.0.0.1:5500/login.html';
    }
  }
});
