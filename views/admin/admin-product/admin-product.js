const API_BASE_URL = 'http://kdt-sw-5-team02.elicecoding.com';

const productList = document.querySelector('#product-list');

const token = sessionStorage.getItem('token');

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
    if (res.ok) {
      console.log(data.data);
      data.data.forEach((v, i) => {
        let desImages = '';

        v.descriptions.forEach((image) => {
          desImages += `<li><img src="http://127.0.0.1:5555${image.path}" alt=${image.originalName}/></li>`;
        });

        productList.innerHTML += `
        <li>
          <div class="product-images">
            <ul><li><img src="http://127.0.0.1:5555${v.thumbnail.path}" alt=${
          v.name
        }/></li>${desImages}</ul>
          </div>
          <p>상품 이름 : ${v.name}</p>
          <p>상품 가격 : ${v.originPrice.toLocaleString()}원</p>
          <p>상품 카테고리 : ${v.tier1Category.name}</p>
          <div id="product-buttons">
            <button id="changeBtn" onclick="location.href = 'admin-productadd.html?${
              v._id
            }';">수정</button>
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

// 상품 삭제
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

onGetProduct();
