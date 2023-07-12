
// 마이페이지-회원정보 조회
const token = sessionStorage.getItem('token');
const isLoggedIn = token !== null && isValidToken(token);

async function fetchTest() {
  if(isLoggedIn){
    try {
      const res = await fetch('http://127.0.0.1:5555/api/users/my-info', {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'token'
          },
        });
        const datas = await res.json();
        const data = datas.data;
        console.log('datas', datas);
        console.log('data', data);
        changeInfo(data)
        memberView(data)
      } catch (error) {
        console.error('get 에러 발생', error);
      }
} //else{
    //   let answer = confirm("로그인이 필요한 페이지입니다.");
    //   if(answer === true){
    //     //로그인페이지로 이동(로그인창으로 이동 필요)
    //     location = 'http://127.0.0.1:5500/f2ting_client/src/views/main/main.html'
    //   }else{
    //     location= 'http://127.0.0.1:5500/f2ting_client/src/views/main/main.html'
    //   }
   // }
}


fetchTest();

function memberView(data) {
    const userId = document.querySelector('.userId')
    const userName = document.querySelector('.userName')
    const email = document.querySelector('.email')
    const phone = document.querySelector('.phone')
    const address = document.querySelector('.address')

    userId.innerText = `${data.account}`
    userName.innerText = `${data.name}`
    email.innerText = `${data.email}`
    phone.innerText = `${data.phone}`
    address.innerText = `${data.address}`
}
function changeInfo(){
  window.location.href = 'http://127.0.0.1:5500/f2ting_client/src/views/member-info/info-change.html'
}