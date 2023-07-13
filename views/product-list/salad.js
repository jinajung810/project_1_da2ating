fetch('http://127.0.0.1:5555/api/categories?category=64aa942d862807652685b488', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res) => res.json())
  .then((data) => {
    const saladCategory = data.data;
    console.log(saladCategory)

    document.getElementById("saladCategory").innerHTML += `
      <h2>${saladCategory[0].name}</h2>
      <img src="http://127.0.0.1:5555${saladCategory[0].bannerImage.path}" alt="식단관리에 가장 기본이 되는 데일리 샐러드 10종 모음" />
    `
    // data.data로 변경
  });

  fetch('http://127.0.0.1:5555/api/products?category=64aa942d862807652685b488', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
  })
    .then((res)=> res.json())
    .then((data)=>{
      const saladListInfo = data.data; 
      console.log(saladListInfo)
  
      document.querySelector('.list-num').textContent = saladListInfo.length; 
  
      for (let i = 0; i < saladListInfo.length; i++) {

        const saledPriceValue = saladListInfo[i].originPrice-(saladListInfo[i].originPrice * (saladListInfo[i].discountRate / 100))
        const saledPrice = saledPriceValue.toLocaleString()
        document.getElementById("salad").innerHTML += `
          <li>
            <a href="javascript:void(0)">
              <img src= './images/salad-list-item01.jpg' alt="" />
              <h3>${saladListInfo[i].name}</h3>
            </a>
            <div class="cart">
              <a href="javascript:void(0)">
                <img src="./images/cart_icn.png" alt="">
              </a>
            </div>
            <span>${saladListInfo[i].discountRate}%</span>
            <strong>
              ${saledPrice}<span>원</span>
              <b>${saladListInfo[i].originPrice}원</b>
            </strong>
          </li>
        `
      }
    })


