const url = 'http://kdt-sw-5-team02.elicecoding.com';

const container = document.querySelector('.user-get');

// 회원 리스트 조회
const getUserData = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('token'),
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
      const {
        account,
        zipCode,
        address,
        detailAddress,
        createdAt,
        email,
        name,
        phone,
        type,
        updatedAt,
        val,
        id,
      } = v;
      container.innerHTML += `<div class="user-data">
              <div class="user-info">
                <p id="user-name">이름: ${name}</p>
                <p id="user-id">아이디: ${id}</p>
                <p id="user-email">이메일: ${email}</p>
                <p id="user-num">전화번호: ${phone}</p>
                <p id="user-address">주소: (${zipCode}) ${address} ${detailAddress}</p>
                <p id="user-date">가입일자: ${createdAt.split('T')[0]}</p>
            
                
              </div>
            </div>`;
    });
  } catch (error) {
    console.log(err);
  }
};

getUserData();
