async function fetchOrders() {
    try {
      const response = await fetch('http://127.0.0.1:5555/api/orders', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      const orders = await response.json();
      console.log('orders', orders);
      return orders;
    } catch (error) {
      console.error('Error fetching orders', error);
      return [];
    }
  }
  
  function getSelectedDateRange() {
    const startDateInput = document.querySelector('input[name="startDate"]');
    const endDateInput = document.querySelector('input[name="endDate"]');
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    return { startDate, endDate };
  }
  
  function handleSearchButtonClick(event) {
    event.preventDefault();
    performSearch();
  }
  
  async function performSearch() {
    const { startDate, endDate } = getSelectedDateRange();
    const orders = await fetchOrders();
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt.substring(0, 10));
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });
    orderView(filteredOrders);
  }
  
  function orderView(orders) {
    const orderTable = document.querySelector('.orderTable');
    orderTable.innerHTML = '';
  
    if (orders.length === 0) {
      const noneViewRow = document.createElement('tr');
      noneViewRow.classList.add('orderview');
      noneViewRow.innerHTML = `<td colspan="5" class="noneView">조회 내역이 없습니다.</td>`;
      orderTable.appendChild(noneViewRow);
      return;
    }
  
    orders.forEach(order => {
      const { _id, products, status, createdAt } = order;
  
      const orderRow = document.createElement('tr');
      orderRow.classList.add('orderview');
  
      const dateCell = document.createElement('td');
      dateCell.classList.add('date');
      dateCell.textContent = `${createdAt.substring(0, 10)} / 주문번호: ${_id}`;
      orderRow.appendChild(dateCell);
  
      const productCell = document.createElement('td');
      productCell.classList.add('option');
      const productName = products[0].productInfo.name;
      productCell.textContent = `${productName} / 옵션`;
      orderRow.appendChild(productCell);
  
      const priceCell = document.createElement('td');
      priceCell.classList.add('price');
      const productPrice = products[0].productInfo.price;
      const productAmount = products[0].amount;
      priceCell.textContent = `${productPrice}원 / ${productAmount}개`;
      orderRow.appendChild(priceCell);
  
      const statusCell = document.createElement('td');
      statusCell.classList.add('orderStatus');
      statusCell.textContent = status;
      orderRow.appendChild(statusCell);
  
      const reviewCell = document.createElement('td');
      reviewCell.classList.add('review');
      reviewCell.innerHTML = '<a href="">리뷰작성</a>';
      orderRow.appendChild(reviewCell);
  
      orderTable.appendChild(orderRow);
    });
  }
  
  const periodButtons = document.querySelectorAll('.period input[type="button"]');
  periodButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const selectedPeriod = event.target.value;
      const dateRange = calculateDateRange(selectedPeriod);
      const startDateInput = document.querySelector('input[name="startDate"]');
      const endDateInput = document.querySelector('input[name="endDate"]');
      startDateInput.value = dateRange.startDate;
      endDateInput.value = dateRange.endDate;
    });
  });
  
  const searchButton = document.querySelector('.period button[type="submit"]');
  searchButton.addEventListener('click', handleSearchButtonClick);