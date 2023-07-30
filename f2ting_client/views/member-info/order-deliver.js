initMypageOrderListPage();

function initMypageOrderListPage() {
  const token = sessionStorage.getItem('token');

  if (token === null) {
    alert('로그인이 필요합니다.');
    location.href = '../login/login.html';
    return;
  }

  getOrderList(token);
}

async function getOrderList(token) {
  try {
    const response = await fetch('http://kdt-sw-5-team02.elicecoding.com/api/users/my-orders', {
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

function orderView(data) {
  const orders = data.orders;

  //표를 불러와서
  const $orderHistory = document.querySelector('#order-history');

  //주문내역이 없으면 표에 5칸 병합한 셀을 붙인다.
  if (orders.length === 0) {
    $orderHistory.innerHTML = `<div class="empty-box">주문 내역이 없습니다.</div>`;
    return;
  }

  orders.forEach(item => {
    const $orderRow = document.createElement('a');
    $orderRow.classList.add('order-history-item');
    $orderRow.setAttribute('href', `./order-detail.html?order=${item._id}`)

    let productName = item.repProductName;
    if (1 < item.productCount) {
      productName += ` 외 ${item.productCount - 1}건`;
    }

    const date = new Date(item.createdAt);

    $orderRow.innerHTML = `
      <div class="order-history-item-inner">
        <div class="img-box">
          <img
            src="http://kdt-sw-5-team02.elicecoding.com${item.repProductImage}"
          />
        </div>
        <div class="info-panel">
          <div class="product-name">${productName}</div>
          <div class="info-row">
            <div class="info-label">주문 일시</div>
            <div class="info-value">${date.toLocaleString()}</div>
          </div>
          <div class="info-row">
            <div class="info-label">결제 금액</div>
            <div class="info-value">${item.totalProductPrice.toLocaleString()}원</div>
          </div>
          <div class="status">${getStatusKorText(item.status)}</div>
        </div>
      </div>
    `;

    $orderHistory.appendChild($orderRow);
  });
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