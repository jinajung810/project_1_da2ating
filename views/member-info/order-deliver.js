
// 토큰 가져오기
const token = sessionStorage.getItem('token');

// 토큰 유효성 검사 함수
function isValidToken(token) {
  return token !== null && token !== undefined && token.trim() !== '';
}

if (isValidToken(token)) {
  fetchMemberInfo();
} else {
  // 로그인되지 않은 상태 처리
  console.log('로그인되지 않은 상태입니다.');
}
// 회원정보 조회 함수
async function fetchMemberInfo() {
  try {
    const response = await fetch('http://127.0.0.1:5555/api/users/my-orders', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log('orders:', orders);
      // 회원정보를 화면에 표시하는 함수 호출
      fetchOrders();
    } else {
      // 회원정보 조회 실패 처리
      console.error('회원정보 조회 실패');
    }
  } catch (error) {
    console.error('회원정보 조회 에러:', error);
  }
}

if(isLoggedIn){
  async function fetchOrders() {
    try {
      const response = await fetch('http://127.0.0.1:5555/api/users/my-orders', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `${token}`
        }
      });
      const orders = await response.json();
      console.log('orders', orders);
      fetchOrders();
      return orders;
    } catch (error) {
      console.error('Error fetching orders', error);
      return [];
    }
  }
} else{
  let answer = confirm("로그인이 필요한 페이지입니다.");
  if(answer === true){
    //로그인페이지로 이동(로그인창으로 이동 필요)
    location.href = 'http://127.0.0.1:5500/views/login/login.html'
  }else{
    location.href = 'http://127.0.0.1:5500/views/main/main.html'
  }
}

//달력에서 시작날짜와 종료날짜 지정
function getSelectedDateRange() {
  const startDate = document.querySelector('input[name="startDate"]').value;
  const endDate = document.querySelector('input[name="endDate"]').value;
  
  return { startDate, endDate };
}
//주문검색 버튼 클릭이벤트 리스너
function handleSearchButtonClick(event) {
    event.preventDefault();
    performSearch();
}
  //startDate, endDate, orders 변수 지정=>지정한 날짜에 맞는 orders데이터 출력
async function performSearch() {
  const { startDate, endDate } = getSelectedDateRange();
  const orders = await fetchOrders();
  //!오류발생)order-deliver.js:48 Uncaught (in promise) ReferenceError: fetchOrders is not defined at performSearch

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt.substring(0, 10));
    return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
  });
  orderView(filteredOrders);
}
  
function orderView(orders) {
  //표를 불러와서
  const orderTable = document.querySelector('.orderTable');
  orderTable.innerHTML = '';
  
  //주문내역이 없으면 표에 5칸 병합한 셀을 붙인다.
  if (orders.length === 0) {
    const noneViewRow = document.createElement('tr');
    noneViewRow.classList.add('orderview');
    noneViewRow.innerHTML = `<td colspan="5" class="noneView">조회 내역이 없습니다.</td>`;
    orderTable.appendChild(noneViewRow);
    return;
  }

    orders.forEach(order => {
      const { createdAt, _id, repProductName, totalProductPrice, productCount, status  } = order;
  
      const orderRow = document.createElement('tr');
      orderRow.classList.add('orderview');
  
      const dateCell = document.createElement('td');
      dateCell.classList.add('date_id');
      dateCell.textContent = `${createdAt.substring(0, 10)} / 주문번호: ${_id}`;
      orderRow.appendChild(dateCell);
  
      const productCell = document.createElement('td');
      productCell.classList.add('option');
      productCell.textContent = `${repProductName}`;
      orderRow.appendChild(productCell);
  
      const priceCell = document.createElement('td');
      priceCell.classList.add('price');
      priceCell.textContent = `${totalProductPrice}원`;
      orderRow.appendChild(priceCell);
  
      const countCell = document.createElement('td');
      countCell.classList.add('count');
      countCell.innerHTML = `${productCount}개`;
      orderRow.appendChild(countCell);
  
      const statusCell = document.createElement('td');
      statusCell.classList.add('status');
      statusCell.textContent = `${status}`;
      orderRow.appendChild(statusCell);
  
      orderTable.appendChild(orderRow);
    });
  
}
//기간 버튼 별 클릭이벤트
const periodButtons = document.querySelectorAll('.period input[type="button"]');
periodButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault()
      const calculateDateRange = (selectedPeriod) => {
        const currentDate = new Date();
        let startDate, endDate ;
      
        if (selectedPeriod === '오늘') {
          startDate = formatDate(currentDate);
          endDate = formatDate(currentDate);
        } else if (selectedPeriod === '7일') {
          startDate = formatDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
          endDate = formatDate(currentDate);
        } else if (selectedPeriod === '15일') {
          startDate = formatDate(new Date(currentDate.getTime() - 15 * 24 * 60 * 60 * 1000));
          endDate = formatDate(currentDate);
        } else if (selectedPeriod === '1개월') {
          startDate = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
          endDate = formatDate(currentDate);
        } else if (selectedPeriod === '3개월') {
          startDate = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate()));
          endDate = formatDate(currentDate);
        } else if (selectedPeriod === '1년') {
          startDate = formatDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate()));
          endDate = formatDate(currentDate);
        }
      
        return { startDate, endDate };
      };
      
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const selectedPeriod = e.target.value;
      const dateRange = calculateDateRange(selectedPeriod);
      const startDateInput = document.querySelector('input[name="startDate"]');
      const endDateInput = document.querySelector('input[name="endDate"]');
      startDateInput.value = dateRange.startDate;
      endDateInput.value = dateRange.endDate;
    });
    
  });
  
  const searchButton = document.querySelector('.period button[type="submit"]');
  searchButton.addEventListener('click', handleSearchButtonClick);