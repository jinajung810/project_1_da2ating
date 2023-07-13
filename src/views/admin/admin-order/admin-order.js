const API_BASE_URL = 'http://127.0.0.1:5555';

const orderList = document.querySelector('.order-tbody');

const StringStatus = {
  'order-receipt': '주문 접수',
  'delivery-start': '배송 시작',
  'delivery-end': '배송 완료',
  'order-complete': '주문 완료',
  'canceled-by-admin': '업체 취소',
  'canceled-by-user': '고객 취소',
};

// 시간 format 변경
const dateFormat = (date) => {
  let dateFormatString = `${date.getFullYear()}-${
    date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${
    date.getDate() < 9 ? '0' + date.getDate() : date.getDate()
  } ${date.getHours()}:${date.getMinutes()}`;

  return dateFormatString;
};

// 주문 목록 가져오기
const onGetOrder = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/orders`, options);
    const data = await res.json();
    console.log(res, data.data);

    let selectoption = '';

    for (key in StringStatus) {
      selectoption += `
      <option value=${key}>${StringStatus[key]}</option>
      `;
    }

    if (res.ok) {
      data.data.orders.forEach((v, i) => {
        orderList.innerHTML += `
        <tr>
          <td>${dateFormat(new Date(v.createdAt))}</td>
          <td>${v.receiverName}</td>
          <td>${v.repProductName}</td>
          <td>${v.totalProductPrice.toLocaleString()}원</td>
          <td>${StringStatus[v.status]}</td>
          <td>
            <div id="product-buttons">
              <select id="status-change${i}">${selectoption}</select>
              <button id="changeBtn" onclick="onChangeOrder('${v._id}', ${i}
        )">수정</button>
              <button id="deleteBtn" onclick="onDeleteOrder('${
                v._id
              }')">삭제</button>
            </div>
          </td>
        </tr>
        `;

        const selected = document.querySelector(`#status-change${i}`);
        for (let i = 0; i < selected.options.length; i++) {
          console.log(selected.options[i].value, v.status);

          if (selected.options[i].value === v.status) {
            selected.options[i].selected = true;
            selected.options[i].classList.add('selected');
          } else {
            selected.options[i].selected = false;
            selected.options[i].classList.remove('selected');
          }
        }
      });
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
  }
};

// 주문 삭제
const onDeleteOrder = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  };
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, options);
    console.log(res);
    if (res.ok) {
      alert('삭제되었습니다!');
      window.location.reload();
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
  }
};

// 주문 수정
const onChangeOrder = async (id, status) => {
  const selected = document.querySelector(`#status-change${status}`);

  const data = {
    status: selected.value,
  };
  console.log(id, status, data);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, options);
    if (res.ok) {
      alert('수정되었습니다!');

      window.location.reload();
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
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
    const res = await fetch(`${API_BASE_URL}/api/users/login`, options);
    const data = await res.json();
    console.log(res, data.data.token);
    if (res.ok) {
      localStorage.setItem('token', data.data.token);
    }
  } catch (error) {
    console.log('test admin login error', error);
  }
};

onGetOrder();
adminLogin();
