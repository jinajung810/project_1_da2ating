// 구매수가 많은 순서로 best product 생성
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
  data.sort((a, b) => b.tier1Category.order - a.tier1Category.order);
  const bestData = data.slice(0, 8); // 구매 수가 많은 순서대로 최대 8개의 아이템 선택
      for(let i=0; i<bestData.length; i++){
      if(bestData[i].discountRate){
        document.querySelector("#bestMenu").innerHTML += `<span class="newMenu">
        <img src=${bestData[i].thumbnail.path} href="" alt=${i+1}>
        <a class="innerCart" href="">
            <img src="/f2ting_client/src/views/common/images/cart-icon.png">
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
        document.querySelector("#bestMenu").innerHTML += `<span class="newMenu">
        <img src=${bestData[i].thumbnail.path} href="" alt=${i+1}>
        <a class="innerCart" href="">
            <img src="/f2ting_client/src/views/common/images/cart-icon.png">
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

