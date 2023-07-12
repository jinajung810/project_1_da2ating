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

        console.log(data.data);

        data.data.forEach((v, i) => {
            // const {type} = user
            container.innerHTML += `<div class="userData">
            <div class="userInfo">
                <p id="userName">${v.name}</p>
                <p id="userEmail">${v.email}</p>
                <p id="userPwd">${v.createdAt}</p>
            </div>
            <button class="modifyBtn" id=mod}>회원정보 수정</button>
            <button class="deleteBtn" id=del}>회원정보 삭제</button>
        </div>` 
        });

      } catch (error) {
        console.log(err);
      }
    };
getUserData();


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
      console.log(token);
      // 로그인할 때 생성된 토큰 sessionStorage에 저장
      sessionStorage.setItem('key', token);
    }
  } catch (error) {
    console.log('test admin login error', error);
  }
};

adminLogin();

// 회원 수정

// 회원 삭제


