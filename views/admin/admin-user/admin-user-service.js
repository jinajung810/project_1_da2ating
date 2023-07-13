const url = "http://127.0.0.1:5555";
const container = document.querySelector('.container');

// 회원 리스트 조회
const getUserData = async () =>{
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('key')
      },
      
    };
    
    try {
        const res = await fetch(`${url}/api/users`, options);
        const data = await res.json();
        
        console.log(res);
        console.log(data);

        if (!res.ok) {
          const errorContent = await res.json();
          const { reason } = errorContent;
  
          throw new Error(reason);
        }

        data.data.forEach((v, i) => {
            const { account, address, createdAt, email, name, phone, type, updatedAt, val, id } = v;
            container.innerHTML += `<div class="user-data">
              <div class="user-info">
                <p id="user-name">이름: ${name}</p>
                <p id="user-email">이메일: ${email}</p>
                <p id="user-num">전화번호: ${phone}</p>
                <p id="user-address">주소: ${address}</p>
                <p id="user-date">가입일자: ${createdAt.split('T')[0]}</p>
            
                
              </div>
            </div>` 

        });

      } catch (error) {
        console.log(err);
      }
    };

// 회원 정보 삭제
const deleteUserData = async (id) => {
  const delBtn = document.querySelector(`#del${id}`);
  console.log(JSON.stringify(id));

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('key')
      },
    body: JSON.stringify(id),
    }
  try {
    const res = await fetch(`${url}/api/users`, options);
    console.log(res);
    location.reload();
  } catch (err) {
      console.log('삭제 실패');
  }
} 

// 임시 테스트용 admin 로그인
const adminLogin = async () => {
  const data = {
    email: 'admin@admin.com',
    password: '1234',
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: null,
    },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(`${url}/api/users/login`, options);
    const data = await res.json();
    if (res.ok) {
      token = data.data.token;
      // 로그인할 때 생성된 토큰 sessionStorage에 저장
      sessionStorage.setItem('key', token);
    }
  } catch (error) {
    console.log('test admin login error', error);
  }
};

// // 회원 주문 상태 수정
// const open = () => {
//   document.querySelector('.modal').classList.remove('hidden');
// }

// const close = () => {
//   document.querySelector('.modal').classList.add('hidden');
// }

// // document.querySelector('.modify-btn').addEventListener('click', open);
// // document.querySelector('.close-btn').addEventListener('click', close);


adminLogin();
getUserData();
