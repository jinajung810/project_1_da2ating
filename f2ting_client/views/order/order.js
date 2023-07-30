const API_BASE_URL = `http://kdt-sw-5-team02.elicecoding.com`;

// 구매자 정보(이름, 번호, 주소, 이메일, 배송 메세지)
const deliveryName = document.querySelector('#deliveryName');
const phoneNumber1 = document.querySelector('#phoneNumber1');
const phoneNumber2 = document.querySelector('#phoneNumber2');
const phoneNumber3 = document.querySelector('#phoneNumber3');
const addressCode = document.querySelector('#addressCode');
const addressBasic = document.querySelector('#addressBasic');
const addressDetail = document.querySelector('#addressDetail');
const deliveryMessage = document.querySelector('#deliveryMessage');

//구매 상품 데이터(localStorage)
const productData = JSON.parse(localStorage.getItem('buyProducts'));

// 가격
const orderProductPrice = document.querySelector('#order-product-price');
const orderDeliveryPrice = document.querySelector('#order-delivery-price');
const orderTotal = document.querySelector('#order-total');

// 구매자 정보 확인하기
const onCheckInfo = () => {
  const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  if (!deliveryName.value) {
    alert('받으시는 분 이름을 입력해주세요.');
  } else if (
    !phoneNumber1.value ||
    !phoneNumber2.value ||
    !phoneNumber3.value
  ) {
    alert('휴대폰 번호를 입력해주세요.');
  } else if (
    !regex.test(
      `${phoneNumber1.value}-${phoneNumber2.value}-${phoneNumber3.value}`
    )
  ) {
    alert('올바른 휴대폰 번호를 입력해주세요.');
  } else if (
    !addressCode.value ||
    !addressBasic.value ||
    !addressDetail.value
  ) {
    alert('주소를 입력해주세요.');
  } else {
    return true;
  }
};

// 구매버튼 클릭 이벤트
const onClickPurchaseBtn = async (e) => {
  e.preventDefault();

  // 맞게 입력 했을 경우 주문 post
  if (onCheckInfo()) {
    // 필요한 상품 정보만 추출
    const products = productData.reduce((list, product) => {
      list.push({
        id: product.productId,
        amount: product.amount,
      });

      return list;
    }, []);

    const orderData = {
      products: products,
      receiverName: deliveryName.value,
      receiverPhone: `${phoneNumber1.value}-${phoneNumber2.value}-${phoneNumber3.value}`,
      receiverZipCode: addressCode.value,
      receiverAddress: addressBasic.value,
      receiverDetailAddress: addressDetail.value,
      deliveryMessage:
        deliveryMessage.value === '' ? undefined : deliveryMessage.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token'),
      },
      body: JSON.stringify(orderData),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, options);
      console.log(res, orderData);

      // 성공 시 페이지 이동
      if (res.ok) {
        localStorage.setItem('buyProducts', JSON.stringify([]));
        localStorage.setItem('cartProducts', JSON.stringify([]));

        // 주문 완료
        window.location.href = '../order/order-complete.html';
      } else {
        alert('다시 시도해주세요!');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// 버튼
const purchaseButton = document.querySelector('#purchaseButton');
const addressBtn = document.querySelector('#addressCodeBtn');

// 구매하기 전 정보 입력 체크
purchaseButton.addEventListener('click', onClickPurchaseBtn);

// 주소 검색
const onSearchAddress = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = ''; // 주소 변수

      // 주소 타입 선택 여부
      if (data.userSelectedType === 'R') {
        // 도로명 주소
        addr = data.roadAddress;
      } else {
        // 지번 주소(J)
        addr = data.jibunAddress;
      }

      addressCode.value = data.zonecode;
      addressBasic.value = addr;

      // 우편번호 수정 금지
      addressCode.disabled = true;

      // 상세주소로 커서 이동
      addressDetail.focus();
    },
  }).open();
};

addressBtn.addEventListener('click', onSearchAddress);

// 구매 상품 정보 데이터 출력
productData.forEach((v, i) => {
  document.querySelector('.product-info-table').innerHTML += `
    <tr class="trhr"></tr>
    <tr>
      <td><a href ='#'><img id="order-product-img"src="${API_BASE_URL}${
    v.productImage
  }" /></a></td>
      <td>${v.productName}</td>
      <td>${v.amount}개</td>
      <td>${v.productPrice.toLocaleString()}원</td>
    </tr>
    <tr class="trhr"></tr>
  `;
});

// 구매 상품 가격 합계
const getProductSum = () => {
  return productData.reduce((sum, v) => {
    return sum + v.productPrice * v.amount;
  }, 0);
};

// 총 상품 금액 출력
const showTotal = () => {
  const productSum = getProductSum();
  let receiptDelivery;

  if (productSum >= 50000) {
    receiptDelivery = 0;
  } else {
    receiptDelivery = 3500;
  }

  // 값 출력
  orderProductPrice.textContent = `${productSum.toLocaleString()}원`;
  orderDeliveryPrice.textContent = `+ ${receiptDelivery.toLocaleString()}원`;
  orderTotal.textContent = `= ${(
    productSum + receiptDelivery
  ).toLocaleString()}원`;
};

showTotal();
