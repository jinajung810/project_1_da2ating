const receivedDetailData = location.href.split('?')[1];
console.log(receivedDetailData); // data

// 전달받은 데이터가 한글일 경우
console.log(decodeURI(receivedDetailData));

fetch(`http://127.0.0.1:5555/api/products/${receivedDetailData}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
  .then((res)=> res.json())
  .then((data)=>{
    const detailInfo = data.data; 
    console.log('detailInfo', detailInfo)

    document.getElementById("productImg").innerHTML = `
    <img src="http://127.0.0.1:5555${detailInfo.thumbnail.path}" alt="">
    `

    const saledPriceValue = detailInfo.originPrice - (detailInfo.originPrice * (detailInfo.discountRate / 100))
    const saledPrice = saledPriceValue.toLocaleString()

    document.getElementById("productInfo").innerHTML = `
    <h2>${detailInfo.name}</h2>
    <span>${detailInfo.discountRate}%</span>
    <div class="productPrice">
      <p>${detailInfo.originPrice}<span>원</span></p>
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
      <p>${detailInfo.name}</p>
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

    for(let i = 0; i < detailInfo.descriptions.length; i++) {
      document.getElementById("desImg").innerHTML += `
      <img src="http://127.0.0.1:5555${detailInfo.descriptions[i].path}" alt="">
      `
    }

    // 상품 수량 버튼 클릭 이벤트 처리 
    const minusBtn = document.querySelector('.minus')
    const plusBtn = document.querySelector('.plus')
    const cartCountInput = document.querySelector('.cartCount');
    const totalPrice = document.querySelector('.totalPrice');

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

    // 장바구니에 추가
    const btnCart = document.querySelector('.btnCart');
    btnCart.addEventListener('click', () => {
      // TODO confirm
      cartInert(detailInfo[0], cartCountInput.value);
    });

    function cartInert(product, count) {

      let cartItems = localStorage.getItem('productsInCart');
      cartItems = JSON.parse(cartItems);

      if (cartItems !== null) {
        let currentProduct = product._id;
        if (cartItems[currentProduct] !== undefined) {
          cartItems = {
            ...cartItems,
            ...cartItems[currentProduct]
          }
        }
        cartItems[currentProduct].inCart += Number(count);
      } else {
        product.inCart = Number(count);
        cartItems = {
          [product._id]: product
        }
      }

      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    }
  })
