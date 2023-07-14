const receivedDetailData = location.href.split('?')[1];
console.log(receivedDetailData); // data

// 전달받은 데이터가 한글일 경우
console.log(decodeURI(receivedDetailData));

fetch(`http://127.0.0.1:5555/api/products/${receivedDetailData}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})
  .then((res) => res.json())
  .then((data) => {
    const detailInfo = data.data;
    console.log('detailInfo', detailInfo);

    document.getElementById('productImg').innerHTML = `
    <img src="http://127.0.0.1:5555${detailInfo.thumbnail.path}" alt="">
    `;

    let saledPrice = detailInfo.originPrice.toLocaleString();

    document.getElementById('productInfo').innerHTML = `
    <h2>${detailInfo.name}</h2>
    <div class="productPrice">
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
    `;

    for (let i = 0; i < detailInfo.descriptions.length; i++) {
      document.getElementById('desImg').innerHTML += `
      <img src="http://127.0.0.1:5555${detailInfo.descriptions[i].path}" alt="">
      `;
    }

    // 상품 수량 버튼 클릭 이벤트 처리
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const cartCountInput = document.querySelector('.cartCount');
    const totalPrice = document.querySelector('.totalPrice');

    // minus 버튼 클릭 이벤트 처리
    minusBtn.addEventListener('click', function () {
      let cartCount = parseInt(cartCountInput.value);
      if (cartCount > 1) {
        cartCount--;
      }
      cartCountInput.value = cartCount;
      let totalPriceValue = detailInfo.originPrice * cartCount;
      totalPrice.innerHTML = totalPriceValue.toLocaleString();
    });

    // plus 버튼 클릭 이벤트 처리
    plusBtn.addEventListener('click', function () {
      let cartCount = parseInt(cartCountInput.value);
      cartCount++;
      cartCountInput.value = cartCount;
      let totalPriceValue = detailInfo.originPrice * cartCount;
      totalPrice.innerHTML = totalPriceValue.toLocaleString();
    });

    const buyButton = document.querySelector('.btnBuynow');

    // 구매 이벤트
    const onBuyProduct = () => {
      const amount = document.querySelector('.cartCount');

      const product = {
        productId: receivedDetailData,
        amount: Number(amount.value),
        productImage: `http://127.0.0.1:5555${detailInfo.thumbnail.path}`,
        productName: detailInfo.name,
        productPrice: detailInfo.originPrice,
      };

      console.log(product);

      localStorage.setItem('buyProduct', JSON.stringify([product]));
      window.location.href = `/views/order/order.html`;
    };

    buyButton.addEventListener('click', onBuyProduct);
  });
