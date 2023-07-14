const url = "http://127.0.0.1:5555";
const container = document.querySelector('.user-get');

// 회원 리스트 조회
const getUserData = async () =>{
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
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
                <p id="user-id">아이디: ${id}</p>
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
    console.log(res, data.data.token);
    if (res.ok) {
      localStorage.setItem('token', data.data.token);
    }
  } catch (error) {
    console.log('test admin login error', error);
  }
};

getUserData();
adminLogin();