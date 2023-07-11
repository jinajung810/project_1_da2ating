// salad.js와 구조만 똑같이 잡아 놓음 - 화면 출력 확인 용 

fetch('http://127.0.0.1:5555/api/categories?category=64aa942d862807652685b488', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res) => res.json())
  .then((data) => {
    const lunchBoxCategory = data.data;
    console.log(lunchBoxCategory)

    document.getElementById("lunchBoxCategory").innerHTML += `
      <h2>${lunchBoxCategory[0].name}</h2>
      <img src="http://127.0.0.1:5555${lunchBoxCategory[0].bannerImage.path}" alt="맛있게 칼로리 줄이고 싶을 때 가벼운 라이스 모음" />
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
    const lunchBoxInfo = data.data; 
    
    document.querySelector('.list-num').textContent = lunchBoxInfo.length; 

    for (let i = 0; i < lunchBoxInfo.length; i++) {

      const lunchBoxPriceValue = lunchBoxInfo[i].originPrice-(lunchBoxInfo[i].originPrice * (lunchBoxInfo[i].discountRate / 100))
      const lunchBoxPrice = lunchBoxPriceValue.toLocaleString()

      document.getElementById("lunchBox").innerHTML += `
        <li>
          <a href="javascript:void(0)">
            <img src= './images/salad-list-item01.jpg' alt="" />
            <h3>${lunchBoxInfo[i].name}</h3>
          </a>
          <div class="cart">
            <a href="javascript:void(0)">
              <img src="./images/cart_icn.png" alt="">
            </a>
          </div>
          <span>${lunchBoxInfo[i].discountRate}%</span>
          <strong>
            ${lunchBoxPrice}<span>원</span>
            <b>${lunchBoxInfo[i].originPrice}원</b>
          </strong>
        </li>
      `
    }
  })
