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
  const newData = data.slice(0, 8); // 최근 8개의 아이템 선택
        for(let i=0; i<newData.length; i++){
        if(newData[i].discountRate){
          document.querySelector("#newMenu").innerHTML += `<span class="newMenu">
          <img src=${newData[i].thumbnail.path} href="" alt=${i+1}>
          <a class="innerCart" href="">
              <img src="/f2ting_client/src/views/common/images/cart-icon.png">
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
          <img src=${newData[i].thumbnail.path} href="" alt=${i+1}>
          <a class="innerCart" href="">
              <img src="/f2ting_client/src/views/common/images/cart-icon.png">
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
  
