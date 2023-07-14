initMypageOrderDetailPage();

function initMypageOrderDetailPage() {
  const token = sessionStorage.getItem('token');

  if (token === null) {
    alert('로그인이 필요합니다.');
    location.href = '../login/login.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('order');

  if (orderId === null) {
    alert('잘못된 경로입니다.');
    location.href = '/';
    return;
  }

  getOrderDetail(token, orderId);
}

async function getOrderDetail(token, orderId) {
  try {
    const response = await fetch(`http://kdt-sw-5-team02.elicecoding.com/api/users/my-orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    if (response.ok) {
      orders = await response.json();
      // 주문정보를 화면에 표시하는 함수 호출
      orderView(orders.data);
    } else {
      // 주문정보 조회 실패 처리
      console.error('주문정보 조회 실패');
    }
  } catch (error) {
    console.error('주문정보 조회 에러:', error);
  }
}

function orderView(item) {
  console.log('test', item);
  
  const date = new Date(item.createdAt);
  
  document.querySelector('#payment-price').textContent = (item.totalProductPrice + item.deliveryPrice).toLocaleString() + '원';
  document.querySelector('#order-date').textContent = date.toLocaleString();
  document.querySelector('#order-status').textContent = getStatusKorText(item.status);
  if (item.status === 'order-receipt') {
    document.querySelector('.info-right-box').innerHTML = `
      <button class="">주문 취소</button>
    `;
  }
  
  
  
  
//  {
//    "_id": "64b15bc6cf692c216ec88574",
//    "orderUser": "64b1277a5e67af884c3ebd80",
//    "totalProductPrice": 19400,
//    "deliveryPrice": 3000,
//    "status": "order-receipt",
//    "deliveryMessage": null,
//    "receiverName": "최원진",
//    "receiverPhone": "010-1234-1234",
//    "receiverZipCode": "06541",
//    "receiverAddress": "서울 서초구 강남대로 477",
//    "receiverDetailAddress": "123123123",
//    "productCount": 2,
//    "repProductName": "야채 볶음밥&햄에그롤",
//    "repProductImage": "/public/09c67fb9-fa17-4912-8337-6926acb117fd-283_detail_01.jpg",
//    "createdAt": "2023-07-14T14:29:26.929Z",
//    "updatedAt": "2023-07-14T14:29:26.929Z",
//    "__v": 0,
//    "orderDetails": [
//        {
//            "_id": "64b15bc6cf692c216ec88576",
//            "orderId": "64b15bc6cf692c216ec88574",
//            "product": {
//                "_id": "64b15adccf692c216ec884b3",
//                "name": "야채 볶음밥&햄에그롤",
//                "thumbnail": {
//                    "_id": "64b15adccf692c216ec884af",
//                    "path": "/public/09c67fb9-fa17-4912-8337-6926acb117fd-283_detail_01.jpg"
//                }
//            },
//            "amount": 1,
//            "productPrice": 4700,
//            "productDiscountRate": null,
//            "__v": 0,
//            "createdAt": "2023-07-14T14:29:26.939Z",
//            "updatedAt": "2023-07-14T14:29:26.939Z"
//        },
//        {
//            "_id": "64b15bc6cf692c216ec88577",
//            "orderId": "64b15bc6cf692c216ec88574",
//            "product": {
//                "_id": "64b157cdcf692c216ec8829a",
//                "name": "취나물밥&매콤 제육볶음",
//                "thumbnail": {
//                    "_id": "64b157cdcf692c216ec88296",
//                    "path": "/public/8b63efaf-ddd0-4ee2-a8df-9323c6bb9670-263_detail_016.jpg"
//                }
//            },
//            "amount": 3,
//            "productPrice": 4900,
//            "productDiscountRate": null,
//            "__v": 0,
//            "createdAt": "2023-07-14T14:29:26.939Z",
//            "updatedAt": "2023-07-14T14:29:26.939Z"
//        }
//    ]
//}

}

function getStatusKorText(status) {
  switch (status) {
    case 'order-receipt': {
      return '주문 접수';
    }
    case 'delivery-start': {
      return '배송 시작';
    }
    case 'delivery-end': {
      return '배송 완료';
    }
    case 'order-complete': {
      return '주문 완료';
    }
    case 'canceled-by-admin': {
      return '업체 취소';
    }
    case 'canceled-by-user': {
      return '고객 취소';
    }
    default: {
      return '';
    }
  }
}


//달력에서 시작날짜와 종료날짜 지정
//function getSelectedDateRange() {
//  const startDate = document.querySelector('input[name="startDate"]').value;
//  const endDate = document.querySelector('input[name="endDate"]').value;
  
//  return { startDate, endDate };
//}

//주문검색 버튼 클릭이벤트 리스너
//function handleSearchButtonClick(event) {
//    event.preventDefault();
//    performSearch();
//}
  //startDate, endDate, orders 변수 지정=>지정한 날짜에 맞는 orders데이터 출력
//async function performSearch() {
//  const { startDate, endDate } = getSelectedDateRange();
//  const orders = await fetchOrders();
//  //!오류발생)order-deliver.js:48 Uncaught (in promise) ReferenceError: fetchOrders is not defined at performSearch

//  const filteredOrders = orders.filter(order => {
//    const orderDate = new Date(order.createdAt.substring(0, 10));
//    return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
//  });
//  orderView(filteredOrders);
//}

////기간 버튼 별 클릭이벤트
//const periodButtons = document.querySelectorAll('.period input[type="button"]');
//periodButtons.forEach(button => {
//    button.addEventListener('click', function (e) {
//      e.preventDefault()
//      const calculateDateRange = (selectedPeriod) => {
//        const currentDate = new Date();
//        let startDate, endDate ;
      
//        if (selectedPeriod === '오늘') {
//          startDate = formatDate(currentDate);
//          endDate = formatDate(currentDate);
//        } else if (selectedPeriod === '7일') {
//          startDate = formatDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
//          endDate = formatDate(currentDate);
//        } else if (selectedPeriod === '15일') {
//          startDate = formatDate(new Date(currentDate.getTime() - 15 * 24 * 60 * 60 * 1000));
//          endDate = formatDate(currentDate);
//        } else if (selectedPeriod === '1개월') {
//          startDate = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
//          endDate = formatDate(currentDate);
//        } else if (selectedPeriod === '3개월') {
//          startDate = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate()));
//          endDate = formatDate(currentDate);
//        } else if (selectedPeriod === '1년') {
//          startDate = formatDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate()));
//          endDate = formatDate(currentDate);
//        }
      
//        return { startDate, endDate };
//      };
      
//      const formatDate = (date) => {
//        const year = date.getFullYear();
//        const month = String(date.getMonth() + 1).padStart(2, '0');
//        const day = String(date.getDate()).padStart(2, '0');
//        return `${year}-${month}-${day}`;
//      };

//      const selectedPeriod = e.target.value;
//      const dateRange = calculateDateRange(selectedPeriod);
//      const startDateInput = document.querySelector('input[name="startDate"]');
//      const endDateInput = document.querySelector('input[name="endDate"]');
//      startDateInput.value = dateRange.startDate;
//      endDateInput.value = dateRange.endDate;
//    });
    
//  });
  
  //const searchButton = document.querySelector('.period button[type="submit"]');
  //searchButton.addEventListener('click', handleSearchButtonClick);