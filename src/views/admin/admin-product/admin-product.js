const API_BASE_URL = 'http://127.0.0.1:5555';

const productList = document.querySelector('#product-list');

let token = '';

// 상품 목록 가져오기
const onGetProduct = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, options);
    const data = await res.json();
    console.log(data.data);
    if (res.ok) {
      data.data.forEach((v, i) => {
        productList.innerHTML += `
        <li>
          <div class="product-thumbnail">
            <img src='https://atowertr6856.cdn-nhncommerce.com/data/goods/20/10/43/1000000060/1000000060_list_075.jpg' alt=${
              v.name
            }/>
          </div>
          <p>상품 이름 : ${v.name}</p>
          <p>상품 가격 : ${v.originPrice.toLocaleString()}원</p>
          <p>상품 카테고리 : ${v.tier1Category.name}</p>
          <div id="product-buttons">
            <button id="changeBtn" >수정</button>
            <button id="deleteBtn" onclick="onDeleteProduct('${
              v._id
            }')">삭제</button>
          </div>
        </li>
        <hr>
            
    `;
      });
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 삭제
const onDeleteProduct = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, options);
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

// 미리보기 사진
const imagePreview = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    //preview.src = e.target.result;

    img.setAttribute('src', e.target.result);
    img.classList.add('preview');

    preview.appendChild(img);
  };
  reader.readAsDataURL(file);
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
    if (res.ok) {
      token = data.data.token;
    }
  } catch (error) {
    console.log('test admin login error', error);
  }
};

onGetProduct();
adminLogin();
