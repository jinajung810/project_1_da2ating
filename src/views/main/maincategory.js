async function fetchTest() {
  try {
    const res = await fetch('http://127.0.0.1:5555/api/categories', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });
    const datas = await res.json();
    const data = datas.data;
    console.log('datas', datas);
    console.log('data', data);
    categoryAdd(data);
  } catch (error) {
    console.error('get 에러 발생', error);
  }
}

fetchTest();

function categoryAdd(data) {
  const category = document.querySelector('.category');
  for (let i = 0; i < data.length; i++) {
    const categoryContent = document.createElement('a');
    categoryContent.textContent = `${data[i].name}`;
    const sanitizedToken = data[i].name.replace(/[\s<>]/g, '_');
    categoryContent.classList.add(sanitizedToken);
    categoryContent.href = data[i]._id;
    category.appendChild(categoryContent);
  }

  // 카테고리 클릭 시 글자색 변화
  const categoryLinks = document.querySelectorAll('.category a');
  categoryLinks.forEach((link) => {
    link.addEventListener('click', function () {
      this.classList.toggle('clicked');
    });
  });
}