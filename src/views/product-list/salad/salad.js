
fetch('http://127.0.0.1:5555/api/products', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res)=> res.json())
  .then((data)=>{
    const saladInfo = data; 
    
    document.querySelector('.list-num').textContent = saladInfo.length; 

    for (let i = 1; i < saladInfo.length; i++) {
      // saladInfo[0].name의 글자수가 길어서 CSS의 수정이 필요함...
      // 어떤 상품을 목록별로 분류할지 정하고서 전반적인 CSS 수정을 해야할 것 같음
      document.getElementById("salad").innerHTML += `
        <li>
          <a href="javascript:void(0)">
            <img src= '../images/salad-list-item01.jpg' alt="" />
            <h3>${saladInfo[i].name}</h3>
          </a>
          <div class="cart">
            <a href="javascript:void(0)">
              <img src="../images/cart_icn.png" alt="">
            </a>
          </div>
          <span>${saladInfo[i].discountRate}%</span>
          <strong>
            ${saladInfo[i].originPrice}<span>원</span>
            <b>${saladInfo[i].originPrice}원</b>
          </strong>
        </li>
      `
    }
  })

