const API_BASE_URL = 'http://kdt-sw-5-team02.elicecoding.com';

// 상품 정보
const productName = document.querySelector('#productName');
const productPrice = document.querySelector('#productPrice');
const productDiscountRate = document.querySelector('#productDiscountRate');
const productCategoryList = document.querySelector('#category-select');
const productThumbnail = document.querySelector('#productThumbnail');
const productDescriptions = document.querySelector('#productDescriptions');
const submitButton = document.querySelector('#submitButton');

const thumbnailPreview = document.querySelector('#thumbnail-preview');
const descriptionsPreview = document.querySelector(
  '.descriptions-preview-list'
);

const thumbnailDeleteBtn = document.querySelector('.thumbnail-deleteBtn');

const receivedData = location.href.split('?')[1];

const token = sessionStorage.getItem('token');

// 카테고리 목록 가져오기(select)
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
    thumbnailPreview.src = e.target.result;
  };
  reader.readAsDataURL(file);

  thumbnailDeleteBtn.classList.remove('hidden');
};

// 상세 사진 파일 처리
const getImageFiles = (e) => {
  const uploadFiles = [];
  const files = e.currentTarget.files;
  const docFrag = new DocumentFragment();

  console.log([...files], productDescriptions.files);

  if ([...files].length >= 4) {
    alert('이미지는 최대 3개까지 업로드가 가능합니다.');
    return;
  }

  // 파일 타입 검사
  [...files].forEach((file) => {
    if (!file.type.match('image/.*')) {
      alert('이미지 파일만 업로드가 가능합니다.');
      return;
    }

    // 파일 갯수 검사
    if ([...files].length < 4) {
      uploadFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = createElement(e, file);
        descriptionsPreview.appendChild(preview);
      };
      reader.readAsDataURL(file);
    }
  });
};

// 상세 사진 ul li 추가
const createElement = (e, file) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.setAttribute('src', e.target.result);
  img.setAttribute('data-file', file.name);
  li.appendChild(img);

  return li;
};

// 상품 목록 가져오기(수정 시 보여줄 기존 상품 데이터)
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

      console.log(product);

      productName.value = product.name;
      productPrice.value = product.originPrice;
      productDiscountRate.value = product.discountRate;
      productCategoryList.value = product.tier1Category._id;
      thumbnailPreview.src = `${API_BASE_URL}${product.thumbnail.path}`;

      //상세 사진 출력
      product.descriptions.forEach((v, i) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', `${API_BASE_URL}${v.path}`);
        img.setAttribute('data-file', v.originalName);
        li.appendChild(img);

        descriptionsPreview.appendChild(li);
      });

      // selected 카테고리 보여주기
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
  }

  console.log(productThumbnail.files.length, productDescriptions.files);

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

onGetCategory();
productThumbnail.addEventListener('change', imagePreview);
productDescriptions.addEventListener('change', getImageFiles);

thumbnailDeleteBtn.addEventListener('click', () => {
  productThumbnail.value = ''; // input 요소의 값 초기화
  thumbnailPreview.src = '';
  thumbnailDeleteBtn.classList.add('hidden');
});
