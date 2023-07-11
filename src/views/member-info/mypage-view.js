
// 마이페이지-회원정보 조회
async function fetchTest() {
    try {
        const res = await fetch('http://127.0.0.1:5555/api/users/my-info', {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          });
          const data = await res.json();
          console.log('data', data);
          memberView(data)
          changeInfo()
    } catch (error) {
      console.error('get 에러 발생', error);
    }
  }

fetchTest();

function memberView(data) {
    const userId = document.querySelector('.userId')
    const userName = document.querySelector('.userName')
    const email = document.querySelector('.email')
    const phone = document.querySelector('.phone')

    userId.innerText=`${data.id}`
    userName.innerText=`${data.name}`
    email.innerText=`${data.email}`
    phone.innerText=`${data.phone}`
}