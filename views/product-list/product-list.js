initProductListPage();

function initProductListPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get('category');

  getCategoryInfo(categoryId);
  getProductsInCategory(categoryId);
}

function getCategoryInfo(categoryId) {
  fetch(`http://kdt-sw-5-team02.elicecoding.com/api/categories/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const category = data.data;

      let tags = `<h2>${category.name}</h2>`;
      if (category.bannerImage !== null) {
        tags += `<img src="http://kdt-sw-5-team02.elicecoding.com${category.bannerImage.path}" alt="${category.name}" />`
      }

      document.getElementById("category").innerHTML = tags;
    });
}

function getProductsInCategory(categoryId) {
  fetch(`http://kdt-sw-5-team02.elicecoding.com/api/products?category=${categoryId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res)=> res.json())
  .then((data)=>{
    const listInfo = data.data; 

    document.querySelector('.list-num').textContent = listInfo.length; 

    for (let i = 0; i < listInfo.length; i++) {
      const price = listInfo[i].originPrice.toLocaleString()
      document.getElementById("categoryList").innerHTML += `
        <li>
          <a href="../product-detail/product-detail.html?${listInfo[i]._id}">
            <img src= 'http://127.0.0.1:5555${listInfo[i].thumbnail.path}' />
            <h3>${listInfo[i].name}</h3>
          </a>
          <strong>
            ${price}<span>원</span>
          </strong>
        </li>
      `
    }
  })
}