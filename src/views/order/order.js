// 구매자 정보(이름, 번호, 주소, 이메일, 배송 메세지)
const deliveryName = document.querySelector('#deliveryName');
const phoneNumber1 = document.querySelector('#phoneNumber1');
const phoneNumber2 = document.querySelector('#phoneNumber2');
const phoneNumber3 = document.querySelector('#phoneNumber3');
const addressCode = document.querySelector('#addressCode');
const addressBasic = document.querySelector('#addressBasic');
const addressDetail = document.querySelector('#addressDetail');
const deliveryMessage = document.querySelector('#deliveryMessage');

//구매 상품 임시 데이터
const productData = [
  {
    productId: 1,
    img: 'https://atowertr6856.cdn-nhncommerce.com/data/goods/20/10/43/1000000060/1000000060_list_075.jpg',
    productName: '닭가슴살 비엔나 샐러드',
    amount: 1,
    price: 9000,
  },
  {
    productId: 2,
    img: 'https://atowertr6856.cdn-nhncommerce.com/data/goods/16/07/14/72/72_list_032.jpg',
    productName: '불고기 샐러드',
    amount: 1,
    price: 8000,
  },
];

// 구매자 정보 확인하기
const onCheckInfo = () => {
  if (!deliveryName.value) {
    alert('받으시는 분 이름을 입력해주세요.');
  } else if (
    !phoneNumber1.value ||
    !phoneNumber2.value ||
    !phoneNumber3.value
  ) {
    alert('휴대폰 번호를 입력해주세요.');
  } else if (
    phoneNumber1.value > 5 ||
    phoneNumber2.value > 5 ||
    phoneNumber3.value > 5
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
    // 필요한 상품 정보만 추출(임시 데이터)
    const products = productData.reduce((list, product) => {
      list.push({
        id: product.productId,
        amount: product.amount,
      });

      return list;
    }, []);

    const orderData = {
      // 임시 상품 데이터
      products: products,
      receiver: {
        name: deliveryName.value,
        phone: phoneNumber1.value + phoneNumber2.value + phoneNumber3.value,
        address: addressBasic.value + addressDetail.value,
      },
      deliveryMessage: deliveryMessage.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '토큰',
      },
      body: JSON.stringify(orderData),
    };

    try {
      const res = await fetch('http://127.0.0.1:5555/api/orders', options);

      // 성공 시 페이지 이동
      if (res.ok) {
        //주문완료 페이지로 이동?
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
      var addr = ''; // 주소 변수

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
      <td><a href ='#'><img src=${v.img} ${v.productName}/></a></td>
      <td>${v.productName}</td>
      <td>${v.amount}개</td>
      <td>${v.price.toLocaleString()}원</td>
    </tr>
    <tr class="trhr"></tr>
  `;
});

// 구매 상품 가격 합계
const getProductSum = () => {
  return productData.reduce((sum, v) => {
    return sum + v.price * v.amount;
  }, 0);
};

// 총 상품 금액 출력
document.querySelector('.product-sum').innerHTML += `
  <h3 class="sum-number">${getProductSum().toLocaleString()}원</h3>
`;
