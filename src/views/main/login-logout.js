
const token1 = sessionStorage.getItem('토큰');
const isLoggedIn1 = token1 !== null && isValidToken(token1);
console.log(isLoggedIn1)
console.log(token1)

  // 로그아웃 버튼 클릭 이벤트 등록
function logout() {
    sessionStorage.removeItem('token1');
    location.href = './main/main.html';
}

function mypage(e){
  e.preventDefault()
  // if(isLoggedIn){

  //   location.href = '../member-info/mypage-view.html'
  // }else{
  //     let answer = confirm("로그인이 필요한 페이지입니다.");
  //     if(answer === true){
  //       //로그인페이지로 이동(로그인창으로 이동 필요)
  //       location.href = './main/main.html'
  //     }else{
  //       location.href = './main/main.html'
  //     }
  //  }
}

function shoppingCart(){
  location.href = '../cart/cart.html'
}
