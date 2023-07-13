fetch('http://127.0.0.1:5555/api/products?category=64aa942d862807652685b488', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res)=> res.json())
  .then((data)=>{
    const detailInfo = data.data; 
    console.log(detailInfo)

    document.getElementById("productImg").innerHTML = `
    <img src="./images/salad-detail-item01.jpg" alt="">
    `

    const saledPriceValue = detailInfo[0].originPrice - (detailInfo[0].originPrice * (detailInfo[0].discountRate / 100))
    const saledPrice = saledPriceValue.toLocaleString()

    document.getElementById("productInfo").innerHTML = `
    <h2>${detailInfo[0].name}</h2>
    <span>${detailInfo[0].discountRate}%</span>
    <div class="productPrice">
      <p>${detailInfo[0].originPrice}<span>원</span></p>
      <strong>${saledPrice}<span>원</span></strong>
    </div>

    <div class="deliveryInfo">
      <p>배송정보</p>
      <img src="./images/s_detail_caution_icn1.png" alt="">
    </div>

    <div class="deliveryFee">
      <span>3,000원 / 주문시결제(선결제) <button>지역별 추가 배송비</button></span>
    </div>

    <div class="count">
      <p>${detailInfo[0].name}</p>
      <div class="btnCount">
        <button class="minus"></button>
        <input type="text" value="1" class="cartCount"></input>
        <button class="plus"></button>
      </div>
    </div>

    <strong class="totalAmount">총 합계 금액 <span class="totalPrice">${saledPrice}</span><b>원</b></strong>

    <div class="btn">
      <button class="btnCart">장바구니</button>
      <button class="btnBuynow">바로 구매</button>
    </div>
    `

    document.getElementById("desImg").innerHTML = `
    <img src="./images/rice_detail__intro02.jpg" alt="">
    `

    // 상품 수량 버튼 클릭 이벤트 처리 
    const minusBtn = document.querySelector('.minus')
    const plusBtn = document.querySelector('.plus')
    const cartCountInput = document.querySelector('.cartCount');
    const totalPrice = document.querySelector('.totalPrice')

    // minus 버튼 클릭 이벤트 처리
    minusBtn.addEventListener('click', function() {
      let cartCount = parseInt(cartCountInput.value);
      if (cartCount > 1) {
        cartCount--;
      }
      cartCountInput.value = cartCount; 
      let totalPriceValue = saledPriceValue * cartCount;
      totalPrice.innerHTML = totalPriceValue.toLocaleString();  
    });
    
    // plus 버튼 클릭 이벤트 처리
    plusBtn.addEventListener('click', function() {
      let cartCount = parseInt(cartCountInput.value);
      cartCount++;
      cartCountInput.value = cartCount;
      let totalPriceValue = saledPriceValue * cartCount;
      totalPrice.innerHTML = totalPriceValue.toLocaleString();
    });
  })
