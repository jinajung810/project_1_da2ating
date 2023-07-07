// 업데이트 날짜 순서로 new product 생성
async function fetchTest() {
    try {
        const res = await fetch('http://127.0.0.1:5555/api/products', {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          });
          const data = await res.json();
          console.log('data', data);
          newProduct(data)
    } catch (error) {
      console.error('get 에러 발생', error);
    }
  }

fetchTest();

function newProduct (data) {
  let newData = []
  for(let i=0; i<data.length; i++){
    if(data.length<=4){
      newData.push(data[i])
    }
  }
  for(let i=0; i<newData.length; i++){
    document.querySelector("#newMenu").innerHTML += `<span class="newMenu">
        <img src=${newData[i].thumbnail} href="" alt=${i+1}>
        <a class="innerCart" href="">
            <span class="material-symbols-outlined">shopping_cart</span>
        </a>
        <a href="">${newData[i].name}</a>
        <label class="price">
            <h2 class="discount">${newData[i].discountRate}%</h2>
            <h4 class="discountPrice">${Math.floor(newData[i].originPrice*(1-newData[i].discountRate/100)/100)*100}원</h4>
            <h6 class="basicPrice">${newData[i].originPrice}원</h6>
        </label>
        <p class="reviewNum">review : ${newData[i].tier1Category.order}</p>
    </span>`
}



}

