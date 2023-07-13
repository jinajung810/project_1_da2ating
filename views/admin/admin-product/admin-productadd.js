const API_BASE_URL = 'http://127.0.0.1:5555';

// 상품 정보
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productDiscountRate = document.querySelector('#productDiscountRate');
const productCategoryList = document.querySelector('#category-select');
const productThumbnail = document.querySelector('#productThumbnail');
const productDescriptions = document.querySelector('#productDescriptions');

const submitButton = document.querySelector('#submitButton');

let token = '';

// 카테고리 목록 가져오기
const onGetCategory = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`, options);
    const data = await res.json(); // 카테고리 데이터 -> 받아서 변수에 넣어주기
    if (res.ok) {
      console.log(data.data);
      data.data
        .sort((a, b) => a.order - b.order)
        .forEach((v, i) => {
          productCategoryList.innerHTML += `
          <option value=${v._id}>${v.name}</option>
    `;
        });
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
  }
};

// 상품 등록
const onAddProduct = async (e) => {
  e.preventDefault();
  console.log(productThumbnail.files[0], [...productDescriptions.files]);

  console.log(Array.isArray([...productDescriptions.files]));
  if (productName.value === '') {
    alert('상품 이름을 입력해주세요.');
    return;
  } else if (productPrice.value === '') {
    alert('상품 가격을 입력해주세요.');
    return;
  }

  let formData = new FormData();

  formData.append('name', productName.value);
  formData.append('originPrice', Number(productPrice.value));
  if (productDiscountRate.value !== '') {
    formData.append('discountRate', Number(productDiscountRate.value));
  }
  formData.append('tier1Category', productCategoryList.value);
  if (productThumbnail.files.length !== 0) {
    formData.append('thumbnail', productThumbnail.files[0]);
  }
  if (productDescriptions.files.length !== 0) {
    for (let i = 0; i < productDescriptions.files.length; i++) {
      formData.append('descriptions', productDescriptions.files[i]);
    }
  }

  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, options);
    console.log(res);
    if (res.ok) {
      window.location.href = 'admin-product.html';
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
    if (res.ok) {
      token = data.data.token;
    }
  } catch (error) {
    console.log('test admin login error', error);
  }
};

onGetCategory();
adminLogin();

submitButton.addEventListener('click', onAddProduct);
