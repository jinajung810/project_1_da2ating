initProductDetailPage();

function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');

  getProductInfo(productId);
}

function getProductInfo(productId) {
  fetch(`http://kdt-sw-5-team02.elicecoding.com/api/products/${productId}`, {
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
      <img src="http://kdt-sw-5-team02.elicecoding.com${detailInfo.thumbnail.path}" alt="">
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
        <img src="http://kdt-sw-5-team02.elicecoding.com${detailInfo.descriptions[i].path}" alt="">
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
          productId: productId,
          amount: Number(amount.value),
          productImage: `http://kdt-sw-5-team02.elicecoding.com${detailInfo.thumbnail.path}`,
          productName: detailInfo.name,
          productPrice: detailInfo.originPrice,
        };
  
        console.log(product);
  
        localStorage.setItem('buyProduct', JSON.stringify([product]));
        window.location.href = `/views/order/order.html`;
      };
  
      buyButton.addEventListener('click', onBuyProduct);

      // 장바구니에 추가
      const btnCart = document.querySelector('.btnCart');
      btnCart.addEventListener('click', () => {
        if (window.confirm("장바구니에 담으시겠습니까?")) {
          addCart(detailInfo, Number(cartCountInput.value));
        }
      });
  
      function addCart(productInfo, count) {
        let prevProducts = localStorage.getItem('cartProducts');
        prevProducts = (prevProducts === null) ? [] : JSON.parse(prevProducts);
  
        const sameProductIndex = prevProducts.findIndex(item => item.productInfo._id === productInfo._id);
        if (sameProductIndex === -1) {
          const newProducts = [
            ...prevProducts,
            { productInfo: productInfo, amount: count }
          ];
          localStorage.setItem('cartProducts', JSON.stringify(newProducts));
  
        } else {
          prevProducts[sameProductIndex].amount += count;
          localStorage.setItem('cartProducts', JSON.stringify(prevProducts));
  
        }
  
        alert('장바구니에 상품이 추가되었습니다.');
      }
    });
}