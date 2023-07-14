
const token = sessionStorage.getItem('token');

// 토큰 유효성 검사 함수
function isValidToken(token) {
  return token !== null && token !== undefined && token.trim() !== '';
}
console.log(isLoggedIn)
console.log(token)


  // 로그아웃 버튼 클릭 이벤트 등록
function logout() {
  if(isValidToken(token)){
    const logout = document.querySelector(".logout");

// 로그아웃 버튼 클릭 이벤트 핸들러 추가
  logout.addEventListener("click", () => {
  // 세션 정보 삭제
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("admin");

  // 로그아웃 후 페이지 이동
  window.location.href = "http://127.0.0.1:5500/views/main/main.html";
  });
}}


function mypage(e){
  e.preventDefault()
  if(isValidToken(token)){
      async function fetchOrders() {
        try {
          const response = await fetch('http://127.0.0.1:5555/api/users/my-orders', {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `${token}`
            }
          });
          const orders = await response.json();
          console.log('orders', orders);
          fetchOrders();
          location.href = 'http://127.0.0.1:5500/views/member-info/mypage-view.html'
          return orders;
        } catch (error) {
          console.error('Error fetching orders', error);
          return [];
        }
      }
    
  }else{
      let answer = confirm("로그인이 필요한 페이지입니다.");
      if(answer === true){
        //로그인페이지로 이동(로그인창으로 이동 필요)
        location.href = 'http://127.0.0.1:5500/views/login/login.html'
      }else{
        location.href = 'http://127.0.0.1:5500/views/main/main.html'
      }
   }
}

function shoppingCart(){
  location.href = '../cart/cart.html'
}
