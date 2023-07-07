// 구매수가 많은 순서로 best product 생성
async function fetchTest() {
    try {
        const res = await fetch('http://127.0.0.1:5555/api/products', {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          });
          const data = await res.json();
          console.log('data', data);
          bestProduct(data)
    } catch (error) {
      console.error('get 에러 발생', error);
    }
}

fetchTest();

function bestProduct (data) {
    data.sort((a, b)=> b.tier1Category.order-a.tier1Category.order)
    bestData = []
    for(let i=0; i<data.length; i++){
      if(data.length <= 8){
        bestData.push(data[i])
      }
    }
    for(let i=0; i<data.length; i++){
        document.querySelector("#bestMenu").innerHTML += `<span class="bestMenu">
            <img src=${bestData[i].thumbnail} href="" alt=${i+1}>
            <a class="innerCart" href="">
                <span class="material-symbols-outlined">shopping_cart</span>
            </a>
            <a href="">${bestData[i].name}</a>
            <label class="price">
                <h2 class="discount">${bestData[i].discountRate}%</h2>
                <h4 class="discountPrice">${Math.floor(bestData[i].originPrice*(1-bestData[i].discountRate/100)/100)*100}원</h4>
                <h6 class="basicPrice">${bestData[i].originPrice}원</h6>
            </label>
            <p class="reviewNum">review : ${bestData[i].tier1Category.order}</p>
        </span>`
    }
}

