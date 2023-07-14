const token = sessionStorage.getItem('token');

// 토큰 유효성 검사 함수
function isValidToken(token) {
  return token !== null && token !== undefined && token.trim() !== '';
}

if (isValidToken(token)) {
  fetchMemberInfo();
} else {
  // 로그인되지 않은 상태 처리
    let answer = confirm("로그인이 필요한 페이지입니다.");
    if(answer === true){
      //로그인페이지로 이동(로그인창으로 이동 필요)
      location.href = 'http://127.0.0.1:5500/views/login/login.html'
    } else{
      location.href = 'http://127.0.0.1:5500/views/main/main.html'
    }
}

// 회원정보 조회 함수
async function fetchMemberInfo() {
  try {
    const response = await fetch('http://127.0.0.1:5555/api/users/my-info', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log('회원정보:', data);
      // 회원정보를 화면에 표시하는 함수 호출
      deleteAccount(data);
    } else {
      // 회원정보 조회 실패 처리
      console.error('회원정보 조회 실패');
    }
  } catch (error) {
    console.error('회원정보 조회 에러:', error);
  }
}

function deleteAccount(data) {
    const confirmed = confirm(`${data.name}님 정말 탈퇴하시겠습니까?`);
    if (confirmed) {
        postDelete(data); // 회원 탈퇴 요청
        const reasonCheckboxes = document.querySelectorAll('input[name="reason"]');
        reasonCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        // 텍스트 입력 필드 초기화
        const commentInput = document.querySelector('input[name="comment"]');
        commentInput.value = '';
    }
}

async function postDelete(data) {
    try {
        const userId = `${data._id}`; // 실제 로그인된 사용자의 아이디로 대체해야 함
        const reason = document.querySelector('input[name="reason"]:checked').value; // 체크된 라디오 버튼의 value 가져오기
        const memo = document.querySelector('input[name="comment"]').value; // 입력된 텍스트 가져오기
        const res = await fetch('http://127.0.0.1:5555/api/users/my-info', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            // 요청에 필요한 데이터 전달
            body: JSON.stringify({
                userId: userId,
                deleteReason: reason,
                deleteMemo: memo
            }),
        });

        const result = await res.json();
        console.log('result', result);
        alert('정상적으로 탈퇴가 되었습니다.');
        window.location.href = 'http://127.0.0.1:5500/main.html';
        // 탈퇴 성공 후 처리 로직 추가
    } catch (error) {
        console.error('회원 탈퇴 에러 발생', error);
        alert('탈퇴가 실패하였습니다.')
        // 탈퇴 실패 시 처리 로직 추가
    }
}
