const token = sessionStorage.getItem('token');
const isLoggedIn = token !== null && isValidToken(token);

//비밀번호 변경

const form = document.querySelector('.changePsw');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPw1 = document.querySelector('input[name="pw1"]').value;
  const newPw2 = document.querySelector('input[name="pw2"]').value;
  
  if (isLoggedIn) {
    if (newPw1 === newPw2 && newPw1 !== data.password) {
      if (confirm('비밀번호를 변경하시겠습니까?')) {
        fetch('http://127.0.0.1:5555/api/users/my-info', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            password: newPw1
          })
        })
        .then((response) => response.json())
        .then((result) => {
          if(result.success) {
            alert('비밀번호가 변경되었습니다.');
            window.location.href = 'http://127.0.0.1:5500/mypage-view.html';
          } else {
            alert('비밀번호 변경에 실패하였습니다.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    } else {
      alert('비밀번호를 다시 확인해주세요.');
    }
  } else {
    let answer = confirm('로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까?');
    if (answer === true) {
      // 로그인 페이지로 이동합니다.
      window.location.href = 'http://127.0.0.1:5500/login.html';
    }
  }
});