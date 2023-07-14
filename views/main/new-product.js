// 업데이트 날짜 순서로 new product 생성




async function fetchTest() {
  try {
    const res = await fetch('http://127.0.0.1:5555/api/products', {
      headers: {
       'Content-Type': 'application/json;charset=utf-8'
      },
    });
  const datas = await res.json();
  const data = datas.data
  console.log('data', data);
  newProduct(data)
  } catch (error) {
    console.error('get 에러 발생', error);
  }
}

fetchTest();

function newProduct(data) {
  data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const newData = data.slice(0, 6); // 최근 6개의 아이템 선택
  for(let i=0; i < newData.length; i++){
    console.log(newData[i])
    if(newData[i].discountRate){
      document.querySelector("#newMenu").innerHTML += `<span class="newMenu">
      <img src="http://127.0.0.1:5555${newData[i].thumbnail.path}" href="" alt=${newData[i].name}>
      <a class="innerCart" href="cartPage()">
      <img src="/resources/icons/cart-icon.png">
      </a>
      <a href="">${newData[i].name}</a>
      <label class="price">
      <h2 class="discount">${newData[i].discountRate}%</h2>
      <h4 class="discountPrice">${Math.floor(newData[i].originPrice*(1-newData[i].discountRate/100)/100)*100}원</h4>
      <h6 class="basicPrice">${newData[i].originPrice}원</h6>
      </label>
      <p class="reviewNum">review : ${newData[i].tier1Category.order}</p>
      </span>`
    }else if(newData[i].discountRate === null){
      document.querySelector("#newMenu").innerHTML += `<span class="newMenu">
      <img src="http://127.0.0.1:5555${newData[i].thumbnail.path}" href="" alt=${newData[i].name}>
      <a class="innerCart" href="cartPage()">
        <img src="/resources/icons/cart-icon.png">
      </a>
      <a href="">${newData[i].name}</a>
      <label class="price">
      <h4 class="discountPrice">${newData[i].originPrice}원</h4>
      </label>
      <p class="reviewNum">review : ${newData[i].tier1Category.order}</p>
      </span>`
    }
  }  
}
const cartButtons = document.querySelectorAll('.innerCart');
for (let i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener('click', addCart);
}
  
// function addCart(e){
//   e.preventDefault();
//   const productInfo = {
//     imgSrc: e.target.preventNode.querySelector('#newMenu img').src,
//     name: e.target.preventNode.querySelector('.name').textContent,
//     price: e.target.parentNode.querySelector('.discountPrice').textContent,
//     quantity: 1,
//     delivery: 3500,
//     inCart: 0,
//     basicPrice : e.target.parentNode.querySelector('.basicPrice').textContent,
//   }
//   if(isLoggedIn){
//     localStorage.setItem('selectedProduct', JSON.stringify(productInfo));
//     window.location.href = '/cart/cart.html';
//   }else{
//     sessionStorage.setItem('selectedProduct', JSON.stringify(productInfo));
//     window.location.href = '/cart/cart.html';
//   }
// }
    