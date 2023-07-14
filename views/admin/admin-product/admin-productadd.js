const API_BASE_URL = 'http://127.0.0.1:5555';

// 상품 정보
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productDiscountRate = document.querySelector('#productDiscountRate');
const productCategoryList = document.querySelector('#category-select');
const productThumbnail = document.querySelector('#productThumbnail');
const productDescriptions = document.querySelector('#productDescriptions');
const submitButton = document.querySelector('#submitButton');
const img = document.createElement('img');

const receivedData = location.href.split('?')[1];

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

// 상품 목록 가져오기
const onGetProduct = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, options);
    const data = await res.json(); // 카테고리 데이터 -> 받아서 변수에 넣어주기
    if (res.ok) {
      const product = data.data;

      productName.value = product.name;
      productPrice.value = product.originPrice;
      productDiscountRate.value = product.discountRate;
      productCategoryList.value = product.tier1Category._id;
      //productThumbnail.files = product.thumbnail;
      //productDescriptions.files = product.descriptions[0];d

      for (let i = 0; i < productCategoryList.options.length; i++) {
        if (
          productCategoryList.options[i].value === product.tier1Category._id
        ) {
          productCategoryList.options[i].selected = true;
          break;
        }
      }
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
  } else if (productThumbnail.files.length === 0) {
    alert('메인 사진을 업로드해주세요.');
    return;
  } else if (productDescriptions.files.length === 0) {
    alert('상세 사진을 업로드해해주세요.');
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

// 상품 수정
const onChangeProduct = async (e) => {
  e.preventDefault();

  if (productName.value === '') {
    alert('상품 이름을 입력해주세요.');
    return;
  } else if (productPrice.value === '') {
    alert('상품 가격을 입력해주세요.');
    return;
  } else if (productThumbnail.files.length === 0) {
    alert('메인 사진을 업로드해주세요.');
    return;
  } else if (productDescriptions.files.length === 0) {
    alert('상세 사진을 업로드해해주세요.');
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
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: formData,
  };

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/products/${receivedData}`,
      options
    );
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

// 상품 수정인 경우
if (receivedData !== undefined) {
  onGetProduct(receivedData);

  document.querySelector('.product-add-container h2').textContent = '상품 수정';
  submitButton.textContent = '수정하기';

  submitButton.addEventListener('click', onChangeProduct);
} else {
  // 상품 추가
  submitButton.addEventListener('click', onAddProduct);
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

productThumbnail.addEventListener('change', imagePreview);
productDescriptions.addEventListener('change', imagePreview);
