// 할인율이 높은 순서로 best product 생성




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
  bestProduct(data)
  } catch (error) {
    console.error('get 에러 발생', error);
  }
}

fetchTest();

function bestProduct (data) {
  data.sort((a, b) => b.discountRate - a.discountRate);
  const bestData = data.slice(0, 6); // 할인율이 높은 순서대로 최대 6개의 아이템 선택
  for(let i=0; i < bestData.length; i++){
    if(bestData[i].discountRate){
      document.querySelector("#bestMenu").innerHTML += `<span class="bestMenu">
      <img src="${bestData[i].descriptions[0].path}" href="" alt=${bestData[i].name}>
      <a class="innerCart" href="">
      <img src="../common/images/cart-icon.png">
      </a>
      <a href="">${bestData[i].name}</a>
      <label class="price">
      <h2 class="discount">${bestData[i].discountRate}%</h2>
      <h4 class="discountPrice">${Math.floor(bestData[i].originPrice*(1-bestData[i].discountRate/100)/100)*100}원</h4>
      <h6 class="basicPrice">${bestData[i].originPrice}원</h6>
      </label>
      <p class="reviewNum">review : ${bestData[i].tier1Category.order}</p>
      </span>`
    }else if(bestData[i].discountRate === null){
      document.querySelector("#bestMenu").innerHTML += `<span class="bestMenu">
      <img src="//127.0.0.1:5555/${bestData[i].descriptions[0].path}" href="" alt=${bestData[i].name}>
      <a class="innerCart" href="">
      <img src="../common/images/cart-icon.png">
      </a>
      <a href="">${bestData[i].name}</a>
      <label class="price">
      <h4 class="discountPrice">${bestData[i].originPrice}원</h4>
      </label>
      <p class="reviewNum">review : ${bestData[i].tier1Category.order}</p>
      </span>`
    }
  }  
}

function addCart(e){
  e.preventDefault();
  const productInfo = {
    imgSrc: e.target.preventNode.querySelector('#bestMenu img').src,
    name: e.target.preventNode.querySelector('.name').textContent,
    price: e.target.parentNode.querySelector('.discountPrice').textContent,
    quantity: 1,
    delivery: 3500,
    inCart: 0,
    basicPrice : e.target.parentNode.querySelector('.basicPrice').textContent,
  }
  if(isLoggedIn){
    localStorage.setItem('selectedProduct', JSON.stringify(productInfo));
    window.location.href = '../cart/cart.html';
  }else{
    sessionStorage.setItem('selectedProduct', JSON.stringify(productInfo));
    window.location.href = '../cart/cart.html';
  }
}
    