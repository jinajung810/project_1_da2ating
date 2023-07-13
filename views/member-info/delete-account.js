
const token = sessionStorage.getItem('token');
const isLoggedIn = token !== null && isValidToken(token);

async function deleteAccount() {
    if(isLoggedIn){
        const confirmed = confirm(`${data.name}님 정말 탈퇴하시겠습니까?`);
        const reasonCheckboxes = document.querySelectorAll('input[name="reason"]');
        const commentInput = document.querySelector('input[name="comment"]');
        if (confirmed) {
            postDelete(data); // 회원 탈퇴 요청
            reasonCheckboxes.forEach((checkbox) => {
                checkbox.checked = false;
              });
              // 텍스트 입력 필드 초기화
            commentInput.value = '';
        }
    }else{
        let answer = confirm("로그인이 필요한 페이지입니다.");
        if(answer === true){
          //로그인페이지로 이동(로그인창으로 이동 필요)
          location = 'http://127.0.0.1:5500/login-view.html'
        }else{
          location = 'http://127.0.0.1:5500/main.html'
        }
    }
}

async function postDelete(data) {
    try {
        const userId = `${data._id}`; // 실제 로그인된 사용자의 아이디로 대체해야 함
        const reason = document.querySelector('input[checked]')
        const memo = document.querySelector('input[name="comment"]')
        const res = await fetch('http://127.0.0.1:5555/api/users/my-info', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `${token}`
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
        // 탈퇴 실패 시 처리 로직 추가
    }
}
