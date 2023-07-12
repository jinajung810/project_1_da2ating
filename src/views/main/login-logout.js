
const token = sessionStorage.getItem('token');
const isLoggedIn = token !== null && isValidToken(token);

  // 로그아웃 버튼 클릭 이벤트 등록
function logout() {
    sessionStorage.removeItem('token');
    location.href = './main/main.html';
}

function mypage(){
  if(isLoggedIn){
    location.href = '../member-info/mypage-view.html'
  }else{
      let answer = confirm("로그인이 필요한 페이지입니다.");
      if(answer === true){
        //로그인페이지로 이동(로그인창으로 이동 필요)
        location.href = './main/main.html'
      }else{
        location.href = './main/main.html'
      }
   }
}

function shoppingCart(){
  location.href = '../cart/cart.html'
}
