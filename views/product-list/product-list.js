const receivedData = location.href.split('?')[1];
console.log(receivedData); // data

// 전달받은 데이터가 한글일 경우
console.log(decodeURI(receivedData));

fetch(`http://127.0.0.1:5555/api/categories?category/${receivedData}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res) => res.json())
  .then((data) => {
    const category = data.data;
    console.log(category)

    document.getElementById("category").innerHTML += `
      <h2>${category[0].name}</h2>
      <img src="http://127.0.0.1:5555${category[0].bannerImage.path}" alt="식단관리에 가장 기본이 되는 데일리 샐러드 10종 모음" />
    `
    // data.data로 변경
  });

  fetch(`http://127.0.0.1:5555/api/products?category=${receivedData}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  })
    .then((res)=> res.json())
    .then((data)=>{
      const ListInfo = data.data; 
      console.log(ListInfo)
  
      document.querySelector('.list-num').textContent = ListInfo.length; 
  
      for (let i = 0; i < ListInfo.length; i++) {

        const PriceValue = ListInfo[i].originPrice-(ListInfo[i].originPrice * (ListInfo[i].discountRate / 100))
        const Price = PriceValue.toLocaleString()
        document.getElementById("categoryList").innerHTML += `
          <li>
            <a href="../product-detail/product-detail.html?${ListInfo[i]._id}">
              <img src= 'http://127.0.0.1:5555${ListInfo[i].thumbnail.path}' />
              <h3>${ListInfo[i].name}</h3>
            </a>
            <div class="cart">
              <a href="javascript:void(0)">
                <img src="./images/cart_icn.png" alt="">
              </a>
            </div>
            <span>${ListInfo[i].discountRate}%</span>
            <strong>
              ${Price}<span>원</span>
              <b>${ListInfo[i].originPrice}원</b>
            </strong>
          </li>
        `
      }
    })

