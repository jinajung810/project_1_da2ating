initSearchPage();

function initSearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get('keyword');

  if (keyword === null || keyword.length < 2) {
    alert('잘못된 경로입니다.');
    location.href = '/';
    return;
  }

  renderSearchProducts(keyword);
}

async function renderSearchProducts(keyword) {
  try {
    const res = await fetch(`http://kdt-sw-5-team02.elicecoding.com/api/products?search=${keyword}`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    
    const datas = await res.json();
    const searchProducts = datas.data;

    const $searchPage = document.querySelector('.search-page');
    if (searchProducts.length === 0) {
      $searchPage.innerHTML = `
        <h2>검색 결과</h2>
        <div class="empty-box">검색 결과가 없습니다.</div>
      `
      return;
    }

    for (let i = 0; i < searchProducts.length; i++) {
      const item = searchProducts[i];
      document.querySelector("#search-list").innerHTML += `
        <a class="product-item" href="../product-detail/product-detail.html?product=${item._id}">
          <img src="http://kdt-sw-5-team02.elicecoding.com${item.thumbnail.path}" alt="${item.name}" />
          <div class="product-item-name">${item.name}</div>
          <div class="product-item-price">
            <span>${item.originPrice.toLocaleString()}</span>원
          </div>
        </a>
      `;
    }

  } catch (error) {
    console.error("에러 발생", error);
  }
}
