const API_BASE_URL = 'http://127.0.0.1:5555';

const categoryList = document.querySelector('#category-list');
const categoryName = document.querySelector('#categoryName');

// 카테고리 임시 데이터
const categoryData = [
  {
    _id: '1',
    name: '샐러드',
    order: 1,
    chilren: [],
  },
  {
    _id: '3',
    name: '도시락',
    order: 3,
    chilren: [],
  },
  {
    _id: '2',
    name: '샌드위치',
    order: 2,
    chilren: [],
  },
  {
    _id: '4',
    name: '닭가슴살',
    order: 4,
    chilren: [],
  },
];

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
    console.log('res', res);
  } catch (error) {
    console.log(error);
  }
};

// order 순서대로 정렬 -> 리스트 나열
categoryData
  .sort((a, b) => a.order - b.order)
  .forEach((v, i) => {
    categoryList.innerHTML += `
        <li>
            <span>${v.name}</span>
            <div id="category-buttons">
                <button id="changeBtn" onClick='onDeleteCategory(${v._id})'>수정</button>
                <button id="deleteBtn">삭제</button>
            </div>
        </li>
        
    `;
  });

// 카테고리 등록
const onAddCategory = async () => {
  // 일단 사진 추가 있는 방향으로..
  let formData = new FormData();

  formData.append('name', categoryName.value);
  formData.append('order', 1);
  formData.append('bannerImage', '');

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/api/categories/tier1`, options);
    const data = await res.json(); // 카테고리 데이터 -> 받아서 변수에 넣어주기
    console.log('res', res);
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 수정

// 카테고리 삭제
const onDeleteCategory = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/categories/tier1/${id}`,
      options
    );
    const data = await res.json(); // 카테고리 데이터 -> 받아서 변수에 넣어주기
    console.log('res', res);
  } catch (error) {
    console.log(error);
  }
};

// 카테고리 추가 모달 이벤트
const open = () => {
  document.querySelector('.category-add-modal').classList.remove('hidden');
};

const close = () => {
  document.querySelector('.category-add-modal').classList.add('hidden');
};

document.querySelector('#openBtn').addEventListener('click', open);
document.querySelector('#closeBtn').addEventListener('click', close);
document.querySelector('.bg').addEventListener('click', close);
