// salad.js와 구조만 똑같이 잡아 놓음 - 화면 출력 확인 용 

fetch('http://127.0.0.1:5555/api/categories?category=64aa942d862807652685b488', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res) => res.json())
  .then((data) => {
    const dressingCategory = data.data;
    console.log(dressingCategory)

    document.getElementById("dressingCategory").innerHTML += `
      <h2>${dressingCategory[0].name}</h2>
      <img src="http://127.0.0.1:5555${dressingCategory[0].bannerImage.path}" alt="샐러드에 산뜻함을 입혀보세요. 베스트 드레싱 5종 모음" />
    `
  });

fetch('http://127.0.0.1:5555/api/products?category=64aa942d862807652685b488', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res)=> res.json())
  .then((data)=>{
    const snackDressingInfo = data.data; 
    
    document.querySelector('.list-num').textContent = snackDressingInfo.length; 

    for (let i = 0; i < snackDressingInfo.length; i++) {

      const dressingPriceValue = snackDressingInfo[i].originPrice-(snackDressingInfo[i].originPrice * (snackDressingInfo[i].discountRate / 100))
      const dressingPrice = dressingPriceValue.toLocaleString()

      document.getElementById("snackDressing").innerHTML += `
        <li>
          <a href="javascript:void(0)">
            <img src= './images/salad-list-item01.jpg' alt="" />
            <h3>${snackDressingInfo[i].name}</h3>
          </a>
          <div class="cart">
            <a href="javascript:void(0)">
              <img src="./images/cart_icn.png" alt="">
            </a>
          </div>
          <span>${snackDressingInfo[i].discountRate}%</span>
          <strong>
            ${dressingPrice}<span>원</span>
            <b>${snackDressingInfo[i].originPrice}원</b>
          </strong>
        </li>
      `
    }
  })
