// salad.js와 구조만 똑같이 잡아 놓음 - 화면 출력 확인 용 

fetch('http://127.0.0.1:5555/api/categories?category=64aa942d862807652685b488', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res) => res.json())
  .then((data) => {
    const chickenCategory = data.data;
    console.log(chickenCategory)

    document.getElementById("chickenCategory").innerHTML += `
      <h2>${chickenCategory[0].name}</h2>
      <img src="http://127.0.0.1:5555${chickenCategory[0].bannerImage.path}" alt="진한 소스에 푹 담겨 촉촉한 닭가슴살 슬라이스 모음" />
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
    const chickenBreastInfo = data.data; 
    
    document.querySelector('.list-num').textContent = chickenBreastInfo.length; 

    for (let i = 0; i < chickenBreastInfo.length; i++) {

      const chickenPriceValue = chickenBreastInfo[i].originPrice-(chickenBreastInfo[i].originPrice * (chickenBreastInfo[i].discountRate / 100))
      const chickenPrice = chickenPriceValue.toLocaleString()
      
      document.getElementById("chickenBreast").innerHTML += `
        <li>
          <a href="javascript:void(0)">
            <img src= './images/salad-list-item01.jpg' alt="" />
            <h3>${chickenBreastInfo[i].name}</h3>
          </a>
          <div class="cart">
            <a href="javascript:void(0)">
              <img src="./images/cart_icn.png" alt="">
            </a>
          </div>
          <span>${chickenBreastInfo[i].discountRate}%</span>
          <strong>
            ${chickenPrice}<span>원</span>
            <b>${chickenBreastInfo[i].originPrice}원</b>
          </strong>
        </li>
      `
    }
  })

