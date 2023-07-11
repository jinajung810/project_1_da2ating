//로그인 버튼 클릭 이벤트 등록
// function login(){
//     location.href = ""
// }

  // 로그아웃 버튼 클릭 이벤트 등록
function logout() {
    sessionStorage.removeItem('token');
    location.href = 'http://127.0.0.1:5500/f2ting_client/src/views/main/main.html';
}







