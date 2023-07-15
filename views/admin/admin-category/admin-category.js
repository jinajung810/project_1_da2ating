const API_BASE_URL = 'http://kdt-sw-5-team02.elicecoding.com';

const categoryList = document.querySelector('#category-list');
const categoryName = document.querySelector('#categoryName');
const categoryImage = document.querySelector('#categoryImage');
const categoryChangeName = document.querySelector('#change-categoryName');
const preview = document.querySelector('#image-preview');
const img = document.createElement('img');

// 버튼
const submitButton = document.querySelector('#submitButton');
const changeBtn = document.querySelector('#changeBtn');
const changeSubmitButton = document.querySelector('#changeSubmitButton');

const token = sessionStorage.getItem('token');

// 카테고리 삭제
const onDeleteCategory = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/categories/tier1/${id}`,
      options
    );
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

// 카테고리 목록 가져오기
const onGetCategory = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`, options);
    const data = await res.json(); // 카테고리 데이터 -> 받아서 변수에 넣어주기
    if (res.ok) {
      // order 순서대로 정렬 -> 리스트 나열
      data.data
        .sort((a, b) => a.order - b.order)
        .forEach((v, i) => {
          // 이미지가 있는 경우에만 출력함
          let image =
            v.bannerImage !== null
              ? `<img src=${API_BASE_URL}${v.bannerImage.path} alt="${v.bannerImage.originalName}" />`
              : '';

          categoryList.innerHTML += `
        <li>
            <span>${v.name}</span>
            <div id="category-buttons">
                <button id="changeBtn" onclick = "changeOpen('${v._id}', '${v.name}')">수정</button>
                <button id="deleteBtn" onclick="onDeleteCategory('${v._id}')">삭제</button>
            </div>
        </li>
        
    `;
        });
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 등록
const onAddCategory = async (e) => {
  e.preventDefault();

  if (categoryName.value === '') {
    alert('카테고리 이름을 입력해주세요.');
    return;
  }

  let formData = new FormData();

  formData.append('name', categoryName.value);
  // if (categoryImage.files.length !== 0) {
  //   formData.append('bannerImage', categoryImage.files[0]);
  // }

  const options = {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/categories/tier1`, options);

    if (res.ok) {
      categoryName.value = '';
      //categoryImage.value = '';
      document.querySelector('.category-add-modal').classList.add('hidden');
      window.location.reload();
    } else {
      alert('다시 시도해주세요!');
    }
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 수정
const onChangeCategory = async (e) => {
  e.preventDefault();

  if (categoryChangeName.value === '') {
    alert('카테고리 이름을 입력해주세요.');
    return;
  }

  let formData = new FormData();

  formData.append('name', categoryChangeName.value);
  // if (categoryImage.files.length !== 0) {
  //   formData.append('bannerImage', categoryImage.files[0]);
  // }

  const options = {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: formData,
  };

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/categories/tier1/${selectedId}`,
      options
    );

    if (res.ok) {
      categoryChangeName.value = '';
      //categoryImage.value = '';
      document.querySelector('.category-add-modal').classList.add('hidden');
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

onGetCategory();

// 카테고리 추가 모달 이벤트
const open = () => {
  document.querySelector('.category-add-modal').classList.remove('hidden');
};

// 카테고리 수정 모달 이벤트
const changeOpen = (selected, name) => {
  document.querySelector('.category-change-modal').classList.remove('hidden');
  categoryChangeName.value = name;
  selectedId = selected;
};

const close = () => {
  // 초기화
  categoryName.value = '';
  //categoryImage.value = '';

  document.querySelector('.category-add-modal').classList.add('hidden');
};

const changeClose = () => {
  // 초기화
  categoryName.value = '';
  //categoryImage.value = '';

  document.querySelector('.category-change-modal').classList.add('hidden');
};

document.querySelector('#openBtn').addEventListener('click', open);
document.querySelector('#closeBtn').addEventListener('click', close);
document
  .querySelector('#change-closeBtn')
  .addEventListener('click', changeClose);
document
  .querySelector('.category-add-modal .bg')
  .addEventListener('click', close);
document
  .querySelector('.category-change-modal .bg')
  .addEventListener('click', changeClose);
submitButton.addEventListener('click', onAddCategory);
//categoryImage.addEventListener('change', imagePreview);
changeSubmitButton.addEventListener('click', onChangeCategory);
