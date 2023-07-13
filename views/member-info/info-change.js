
const token = sessionStorage.getItem('token');
const isLoggedIn = token !== null && isValidToken(token);
 
// 토큰 유효성 검사 로직 작성
function isValidToken(token) {
  return token !== null && token !== undefined && token.trim() !== '';
}

// 로그인 정보 가져오기
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
const infoForm = document.querySelector('.changeInfo');

// 주소 검색 버튼
const addressCodeBtn = document.querySelector('#addressCodeBtn');

// input 태그 주소 입력 부분
const addressCodeInput = document.querySelector('#addressCode');
const addressBasicInput = document.querySelector('#addressBasic');
const addressDetailInput = document.querySelector('#addressDetail');

// 회원정보 변경 데이터 전송 함수
const handleInfoSubmit = async (event) => {
  event.preventDefault();
  
  const userName = document.querySelector('.userName').value;
  const userEmail = document.querySelector('.email').value;
  const phone = document.querySelector('.phone1').value;
  const addressCode = addressCodeInput.value;
  const addressBasic = addressBasicInput.value;
  const addressDetail = addressDetailInput.value;
  // 서버로 전송할 데이터 생성
  const data = {
    userName,
    userEmail,
    phone,
    addressCode,
    addressBasic,
    addressDetail,
  };
    // 서버로 데이터 전송
    if(isLoggedIn){
      try {
        const response = await fetch('http://127.0.0.1:5555/api/users/my-info', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          // 변경 성공 시 이벤트 작성
          alert('회원정보 수정이 완료되었습니다.');
          location.href = 'http://127.0.0.1:5500/f2ting_client/src/views/member-info/mypage-view.html';
        } else {
          alert('회원정보 수정에 실패했습니다.');
        }
      } catch (err) {
        console.error(`Error: ${err}`);
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
// 주소 검색 이벤트 리스너 작성
function DaumPostcode() {
  new daum.Postcode({
    oncomplete: function(data) {                                        
      var addr = '';
      var extraAddr = ''; 
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
      if(data.userSelectedType === 'R'){
        if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
          extraAddr += data.bname;
        }
        if(data.buildingName !== '' && data.apartment === 'Y'){
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        if(extraAddr !== ''){
          extraAddr = ' (' + extraAddr + ')';
        }
        document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        document.getElementById("sample6_extraAddress").value = '';
      }
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('addressCode').value = data.zonecode;
      document.getElementById("addressBasic").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("addressDetail").focus();
    }
  }).open();
}

infoForm.addEventListener('submit', handleInfoSubmit);
