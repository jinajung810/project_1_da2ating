//initTestProductList();

//async function initTestProductList() {
//  const res = await fetch('http://kdt-sw-5-team02.elicecoding.com/api/products');
//  const resJson = await res.json();
//  let productTags = '';
//  resJson.data.forEach(item => {
//    productTags += `
//      <li>
//        <span>${item.name}</span>
//        <button onclick="confirmCart(this)" data-id="${item._id}">장바구니에 추가</button>
//      </li>
//    `;
//  });
//  document.querySelector('#testProductList').innerHTML = productTags;
//}

//async function confirmCart(elm) {
//  const productId = elm.getAttribute('data-id');

//  const res = await fetch(`http://kdt-sw-5-team02.elicecoding.com/api/products/${productId}`);
//  const resJson = await res.json();
//  const productInfo = resJson.data;

//  if (window.confirm("장바구니에 담으시겠습니까?")) {
//    addCart(productInfo);
//  }
//}

//function addCart(productInfo) {
//  const prevProducts = getProductsInCart();
//  const sameProductIndex = prevProducts.findIndex(item => item.productInfo._id === productInfo._id);

//  if (sameProductIndex === -1) {
//    const newProducts = [
//      ...prevProducts,
//      { productInfo: productInfo, amount: 1 }
//    ];
//    setProductsInCart(newProducts);

//  } else {
//    prevProducts[sameProductIndex].amount += 1;
//    setProductsInCart(prevProducts);

//  }

//  location.reload();
//}

/////////////////////////////////////////////////////////////////////
const $receiptPrice = document.querySelector('#receipt-price');
const $receiptDelivery = document.querySelector('#receipt-delivery');
const $receiptTotal = document.querySelector('#receipt-total');
const $productContainer = document.querySelector('tbody');

displayCart();

function getProductsInCart() {
  const productsInCart = localStorage.getItem('cartProducts');
  return (productsInCart === null) ? [] : JSON.parse(productsInCart);
}

function getProductInCartIndex(productId) {
  const productsInCart = getProductsInCart();
  return productsInCart.findIndex(item => item.productInfo._id === productId);
}

function setProductsInCart(newProductsInCart) {
  localStorage.setItem('cartProducts', JSON.stringify(newProductsInCart));
}

function displayCart() {
  const productsInCart = getProductsInCart();

  if (productsInCart.length === 0) {
    $productContainer.innerHTML = `<tr class="empty-cart"><td colspan="7"><p>장바구니에 담긴 상품이 없습니다.</p></td></tr>`;
    return;
  }

  let productsInCartTags = ''
  for (let i = 0; i < productsInCart.length; i++) {
    const item = productsInCart[i];
    const productId = item.productInfo._id;

    productsInCartTags += `
      <tr class="exist-cart" data-id="${productId}">
        <td class="item-chk">
          <div class="item-chkbox">
            <input type="checkbox" name="price" id="chknum${i}" value="${item.amount}" checked="checked" onchange="changeCheckbox()">
            <label for="chknum${i}"></label>
          </div>
        </td>
        <td class="item-info product">
          <a href="#">
            <div id="item-img"><img src='http://kdt-sw-5-team02.elicecoding.com${item.productInfo.thumbnail.path}' alt=""></div>
            <div id="item-des">
              <p class="item-name">${item.productInfo.name}</p>
            </div>
          </a>
        </td>
        <td class="order-amount">
          <div class="each">
            <img src="./assets/add.png" class="increase" id="btn-up" onclick="increaseProductAmount('${productId}')">
              <span>${item.amount}</span>
            <img src="./assets/remove.png" class="decrease" id="btn-down" onclick="decreaseProductAmount('${productId}')">
          </div>
        </td>
        <td>
          <p>${item.productInfo.originPrice}</p>
        </td>
        <td>
          <p class="order-price" style="color: orange; font-weight: 700;">${item.productInfo.originPrice * item.amount}</p>
        </td>
        <td>
          <span class="del-btn" onclick="deleteProduct('${productId}')">삭제하기</span>
        </td>
      </tr>
    `;
  }
  $productContainer.innerHTML = productsInCartTags;

  calcCartPrice();
}

// 상품 갯수 증가
function increaseProductAmount(productId) {
  const productsInCart = getProductsInCart();
  const productInCartIndex = getProductInCartIndex(productId);
  if (productInCartIndex === -1) return;


  productsInCart[productInCartIndex].amount += 1;
  const amount = productsInCart[productInCartIndex].amount;
  const productPrice = productsInCart[productInCartIndex].productInfo.originPrice;

  setProductsInCart(productsInCart);
  document.querySelector(`.exist-cart[data-id="${productId}"] span`).textContent = productsInCart[productInCartIndex].amount;
  document.querySelector(`.exist-cart[data-id="${productId}"] .order-price`).textContent = (amount * productPrice);
  calcCartPrice();
}

// 상품 갯수 감소
function decreaseProductAmount(productId) {
  const productsInCart = getProductsInCart();
  const productInCartIndex = getProductInCartIndex(productId);
  if (productInCartIndex === -1) return;

  if (productsInCart[productInCartIndex].amount === 1) {
    alert('1개 이상 구매 가능합니다.');
    return;
  }

  productsInCart[productInCartIndex].amount -= 1;
  const amount = productsInCart[productInCartIndex].amount;
  const productPrice = productsInCart[productInCartIndex].productInfo.originPrice;

  setProductsInCart(productsInCart);
  document.querySelector(`.exist-cart[data-id="${productId}"] span`).textContent = productsInCart[productInCartIndex].amount;
  document.querySelector(`.exist-cart[data-id="${productId}"] .order-price`).textContent = (amount * productPrice);
  calcCartPrice();
}

// 상품 전체 체크 or 해제
function changeAllCheckbox(elm) {
  const checkboxElms = document.querySelectorAll('input[name="price"]');

  const currentStatus = elm.checked;
  if (currentStatus === true) {
    checkboxElms.forEach(item => item.checked = true);
  } else {
    checkboxElms.forEach(item => item.checked = false);
  }

  calcCartPrice();
}

// 상품 단일 체크 or 해제
function changeCheckbox() {
  const chkAllElm = document.querySelector('#chkAll');
  const checkedElms = document.querySelectorAll('input[name="price"]:checked');

  if (checkedElms.length === 0) {
    chkAllElm.checked = false;
  } else {
    chkAllElm.checked = true;
  }

  calcCartPrice();
}

// 상품 하나 삭제
function deleteProduct(productId) {
  const prevProductsInCart = getProductsInCart();
  const newProductsInCart = prevProductsInCart.filter(item => item.productInfo._id !== productId);
  setProductsInCart(newProductsInCart);

  document.querySelector(`.exist-cart[data-id="${productId}"]`).remove();

  calcCartPrice();

  if (newProductsInCart.length === 0) {
    $productContainer.innerHTML = `<tr class="empty-cart"><td colspan="7"><p>장바구니에 담긴 상품이 없습니다.</p></td></tr>`;
  }
}

// 상품 전체 삭제
function deleteAllProducts() {
  $productContainer.innerHTML = `<tr class="empty-cart"><td colspan="7"><p>장바구니에 담긴 상품이 없습니다.</p></td></tr>`;
  setProductsInCart([]);
  calcCartPrice();
}

// 상품 가격 계산
function calcCartPrice() {
  let totalProductPrice = 0;

  const productsInCart = getProductsInCart();

  const checkedRows = document.querySelectorAll('.exist-cart input[name="price"]:checked');
  checkedRows.forEach(elm => {
    const rowElm = elm.parentNode.parentNode.parentNode;
    const productId = rowElm.getAttribute('data-id');
    const productIndex = getProductInCartIndex(productId);

    const productPrice = productsInCart[productIndex].productInfo.originPrice;
    const amount = productsInCart[productIndex].amount;

    totalProductPrice += (productPrice * amount);
  });

  $receiptPrice.textContent = `${totalProductPrice}원`;

  const freeDeliveryStandardAmount = 50000;
  let deliveryPrice = 3000;
  if (freeDeliveryStandardAmount <= totalProductPrice) {
    deliveryPrice = 0;
  }

  $receiptDelivery.textContent = `${deliveryPrice}원`;
  $receiptTotal.textContent = `${totalProductPrice + deliveryPrice}원`;
}



function buyCartProducts() {
  const checkedRows = document.querySelectorAll('.exist-cart input[name="price"]:checked');

  if (checkedRows.length === 0) {
    alert('구매할 상품이 없습니다.');
    return;
  }

  const productsInCart = getProductsInCart();

  const buyProducts = [];
  checkedRows.forEach(elm => {
    const rowElm = elm.parentNode.parentNode.parentNode;
    const productId = rowElm.getAttribute('data-id');
    const productIndex = getProductInCartIndex(productId);
    const productData = productsInCart[productIndex];

    const buyProduct = {
      productId: productData.productInfo._id,
      amount: productData.amount,
      productImage: productData.productInfo.thumbnail.path,
      productName: productData.productInfo.name,
      productPrice: productData.productInfo.originPrice,
    };

    buyProducts.push(buyProduct);
  });
  

  localStorage.setItem('buyProducts', JSON.stringify(buyProducts));
  window.location.href = `../order/order.html`;
}