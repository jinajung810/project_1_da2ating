initBestProducts();

async function initBestProducts() {
  try {
    const res = await fetch('http://kdt-sw-5-team02.elicecoding.com/api/products/best', {
      headers: {
       'Content-Type': 'application/json;charset=utf-8'
      },
    });
    const datas = await res.json();
    const data = datas.data
    bestProduct(data);

  } catch (error) {
    console.error('get 에러 발생', error);
  }
}

function bestProduct(bestData) {
  for (let i = 0; i < bestData.length; i++) {
    const item = bestData[i];
    document.querySelector("#bestMenu").innerHTML += `
      <a class="product-item" href="../product-detail/product-detail.html?product=${item._id}">
        <img src="http://kdt-sw-5-team02.elicecoding.com${item.thumbnail.path}" alt="${item.name}" />
        <div class="product-item-name">${item.name}</div>
        <div class="product-item-price">
          <span>${item.originPrice.toLocaleString()}</span>원
        </div>
      </a>
    `;
  }
}