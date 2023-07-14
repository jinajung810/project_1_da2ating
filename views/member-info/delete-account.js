initMypageInfoDeletePage();

function initMypageInfoDeletePage() {
  const token = sessionStorage.getItem('token');

  if (token === null) {
    alert('로그인이 필요합니다.');
    location.href = '../login/login.html';
    return;
  }
}

function confirmDeleteMemberInfo() {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  const confirmed = confirm(`${userInfo.name}님 정말 탈퇴하시겠습니까?`);
  if (confirmed) {
      deleteMemberInfo(); // 회원 탈퇴 요청
      const reasonCheckboxes = document.querySelectorAll('input[name="reason"]');
      reasonCheckboxes.forEach((checkbox) => {
          checkbox.checked = false;
      });
      // 텍스트 입력 필드 초기화
      const commentInput = document.querySelector('input[name="comment"]');
      commentInput.value = '';
  }
}

async function deleteMemberInfo() {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch('http://kdt-sw-5-team02.elicecoding.com/api/users/my-info', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    if (response.ok) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userInfo');
      alert('정상적으로 탈퇴가 되었습니다.');
      window.location.href = '/';

    } else {
      alert('응?');
      //console.error('탈퇴 실패');
    }
  } catch (error) {
    console.error('탈퇴 에러:', error);
  }
}