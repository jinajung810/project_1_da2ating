
// 마이페이지-회원정보 조회
async function fetchTest() {
    try {
        const res = await fetch('http://127.0.0.1:5555/api/users/my-info', {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          });
          const data = await res.json();
          console.log('data', data);
          memberInfoChange(data)
    } catch (error) {
      console.error('get 에러 발생', error);
    }
  }

fetchTest();
//회원정보 변경
function memberInfoChange(data) {
        // 휴대폰번호 변경
    const phoneInput = document.querySelector('input[name="phone"]');
    phoneInput.value = `${data.phone}`; // 새로운 휴대폰번호 값으로 설정

    // 휴대폰번호를 3자리, 4자리, 4자리로 나누어 출력
    const phone = phoneInput.value;
    const phone1 = phone.slice(0, 3); // 첫 번째 3자리
    const phone2 = phone.slice(3, 7); // 두 번째 4자리
    const phone3 = phone.slice(7); // 세 번째 4자리

    console.log('휴대폰번호:', phone1 + '-' + phone2 + '-' + phone3);
    위의 코드를 사용하면 01012345678과 같은 휴대폰번호가 010-1234-5678 형식으로 출력됩니다. 이를 실제 코드에 적용하려면 fetchAndSearchImages 함수 내에서 휴대폰번호를 나누어 출력하는 부분에 위의 코드를 추가하시면 됩니다.






Regenerate response


        const idInput = document.querySelector('input[name="id"]');
        idInput.value = ${data.id}

        const nameInput = document.querySelector('input[name="userName"]');
        nameInput.value = ${data.name};

        const emailInput = document.querySelector('input[name="email1"]');
        emailInput.value = ${data.email};

        const phone1Select = document.querySelector('select[name="phone1"]');
        phone1Select.value = phone1;

        const phone2Input = document.querySelector('input[name="phone2"]');
        phone2Input.value = phone2;

        const phone3Input = document.querySelector('input[name="phone3"]');
        phone3Input.value = phone3;

        // 이벤트 리스너 등록
        const changeInfoForm = document.querySelector('.changeInfo');
        changeInfoForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const newId = idInput.value;
            const newName = nameInput.value;
            const newEmail = emailInput.value;
            const newPhone1 = phone1Select.value;
            const newPhone2 = phone2Input.value;
            const newPhone3 = phone3Input.value;

            // TODO: 변경된 회원 정보를 서버로 전송하는 로직 작성
            // 서버로 데이터를 전송하는 AJAX 요청 등을 이용하여 구현 가능합니다.
            // 이 예시에서는 변경된 회원 정보를 콘솔에 출력하는 것으로 대체합니다.
            console.log('새로운 아이디:', newId);
            console.log('새로운 이름:', newName);
            console.log('새로운 이메일:', newEmail);
            console.log('새로운 휴대폰번호:', newPhone1 + '-' + newPhone2 + '-' + newPhone3);
            });

            // 비밀번호 변경
            const changePswForm = document.querySelector('.changePsw');
            changePswForm.addEventListener('submit', function(event) {
            event.preventDefault(); // 폼 전송 기본 동작 막기

            // 새 비밀번호 입력값 가져오기
            const newPassword = document.querySelector('input[name="pw"]').value;

            // TODO: 변경된 비밀번호를 서버로 전송하는 로직 작성
            // 서버로 데이터를 전송하는 AJAX 요청 등을 이용하여 구현 가능합니다.
            // 이 예시에서는 변경된 비밀번호를 콘솔에 출력하는 것으로 대체합니다.
            console.log('새로운 비밀번호:', newPassword);
        });
}


//비밀번호 변경