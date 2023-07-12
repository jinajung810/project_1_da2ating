// 로그인 정보 가져오기
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

// if (!userInfo) { // 로그인하지 않았다면
//   alert('로그인 후 이용 가능합니다.');
//   window.location.href = 'http://127.0.0.1:5500/login-view.html';
// } else { // 로그인한 사용자만 사용 가능
  // 회원정보 변경 폼
  const infoForm = document.querySelector('.changeInfo');

  // 비밀번호 변경 폼
  const pswForm = document.querySelector('.changePsw');

  // 주소 검색 버튼
  const addressCodeBtn = document.querySelector('#addressCodeBtn');

  // input 태그 주소 입력 부분
  const addressCodeInput = document.querySelector('#addressCode');
  const addressBasicInput = document.querySelector('#addressBasic');
  const addressDetailInput = document.querySelector('#addressDetail');

  // 회원정보 변경 데이터 전송 함수
  const handleInfoSubmit = async (event) => {
    event.preventDefault();

    // 데이터 가져오기 
    const userName = document.querySelector('.userName').value;
    const email = document.querySelector('.email').value;
    const phone1 = document.querySelector('.phone1').value;
    const addressCode = addressCodeInput.value;
    const addressBasic = addressBasicInput.value;
    const addressDetail = addressDetailInput.value;

    // 서버로 전송할 데이터 생성
    const data = {
      userName,
      email,
      phone1,
      addressCode,
      addressBasic,
      addressDetail,
    };

    // 서버로 데이터 전송
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        // 변경 성공 시 이벤트 작성
        alert('회원정보 수정이 완료되었습니다.');
        window.location.href = 'http://127.0.0.1:5500/mypage-view.html';
      } else {
        alert('회원정보 수정에 실패했습니다.');
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  // 비밀번호 변경 데이터 전송 함수
  const handlePswSubmit = async (event) => {
    event.preventDefault();

    // 데이터 가져오기
    const pw1 = document.querySelector('[name=pw1]').value;
    const pw2 = document.querySelector('[name=pw2]').value;

    // 서버로 전송할 데이터 생성
    const data = {
      pw1,
      pw2,
    };

    // 서버로 데이터 전송
    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        // 변경 성공 시 이벤트 작성
        alert('비밀번호 수정이 완료되었습니다.');
        window.location.href = 'http://127.0.0.1:5500/mypage-view.html';
      } else {
        alert('비밀번호 수정에 실패했습니다.');
      }
    } catch (err) {
      console.error(`Error: ${err}`);
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

  // 이벤트 리스너 작성
  infoForm.addEventListener('submit', handleInfoSubmit);
  pswForm.addEventListener('submit', handlePswSubmit);
// }