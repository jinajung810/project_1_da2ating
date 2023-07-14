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


    if (!res.ok) {
      const errorContent = await res.json();
      const { reason } = errorContent;

      throw new Error(reason);
    }
    
    const userList = document.querySelector('.order-tbody');
    data.data.forEach((v, i) => {

      let addr = '';
      if (v.zipCode !== null) addr += `(${v.zipCode})`;
      if (v.address !== null) addr += ` ${v.address}`;
      if (v.detailAddress !== null) addr += `(${v.detailAddress})`;

      userList.innerHTML += `
        <tr>
          <td>${v.name}</td>
          <td>${v.email}</td>
          <td>${v.phone || ''}</td>
          <td>${addr}</td>
          <td>${v.createdAt.split('T')[0]}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.log(error);
  }
};

getUserData();
