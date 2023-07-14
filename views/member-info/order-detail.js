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
    document.querySelector('.cancel-btn-box').innerHTML = `
      <button class="action-btn" data-id="${item._id}" onclick="confirmCancelOrder(this)">주문 취소</button>
    `;
  }

  document.querySelector('#receiver-name').textContent = item.receiverName;
  document.querySelector('#receiver-phone').textContent = item.receiverPhone;
  document.querySelector('#receiver-addr').textContent = `(${item.receiverZipCode}) ${item.receiverAddress} ${item.receiverDetailAddress}`;
  document.querySelector('#receiver-msg').textContent = item.deliveryMessage || '-';

  let productTags = '';
  item.orderDetails.forEach(detail => {
    productTags += `
      <div class="order-product-item">
        <div class="img-box">
          <img
            src="http://kdt-sw-5-team02.elicecoding.com${detail.product.thumbnail.path}"
          />
        </div>
        <div class="product-info-panel">
          <div class="product-name">${detail.product.name}</div>
          <div class="product-desc">가격. ${detail.productPrice.toLocaleString()}원</div>
          <div class="product-desc">수량. ${detail.amount}개</div>
          <div class="product-desc">총 가격. ${(detail.amount * detail.productPrice).toLocaleString()}원</div>
        </div>
      </div>
    `;
  });
  document.querySelector('.order-product-list').innerHTML = productTags;
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

function confirmCancelOrder(elm) {
  if (confirm('정말 취소하시겠습니까?')) {
    const orderId = elm.getAttribute('data-id');
    cancelOrder(orderId);
  }
}

async function cancelOrder(orderId) {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`http://kdt-sw-5-team02.elicecoding.com/api/users/my-orders/${orderId}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    if (response.ok) {
      location.reload();
    } else {
      console.error('주문 접수 상태에서만 취소할 수 있습니다.');
    }
  } catch (error) {
    console.error('주문정보 조회 에러:', error);
  }
}
