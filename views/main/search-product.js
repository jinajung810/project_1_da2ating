// 업데이트 날짜 순서로 new product 생성
async function fetchAndSearchImages(searchQuery) {
  try {
    const res = await fetch(`http://127.0.0.1:5555/api/products`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const datas = await res.json();
    const data = datas.data;
    console.log("data", data);

    // 이미지 컨테이너를 초기화하여 이전 검색 결과를 지움
    const imageContainer = document.querySelector(".division");
    imageContainer.innerHTML = "";

    const filteredData = data.filter((item) => item.name.includes(searchQuery));

    // 서치페이지를 감싸는 div 요소 생성
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("menu");

    // 검색 태그 명 요소 생성
    const itemcontent = document.createElement("h2");
    itemcontent.innerText = "상품 검색 결과";
    itemcontent.setAttribute("style", "font-size:40px");

    // itemContainer에 상품요소 틀 추가
    itemContainer.appendChild(itemcontent);
    imageContainer.appendChild(itemContainer);

    const imgContainer1 = document.createElement("div");
    imgContainer1.setAttribute("id", "bestMenu");
    itemContainer.appendChild(imgContainer1);

    if (filteredData.length > 0) {
      filteredData.forEach((item) => {
        // 상품을 감싸는 span 요소 생성
        const imgContainer2 = document.createElement("span");
        imgContainer2.classList.add("bestMenu");

        // 이미지 요소 생성
        const imgElement = document.createElement("img");
        imgElement.src = `http://127.0.0.1:5555${item.thumbnail.path}`;
        imgElement.alt = item.name;
        imgElement.href = item._id;

        // 이미지 이름을 표시하는 a 요소 생성
        const nameElement = document.createElement("a");
        nameElement.textContent = item.name;
        nameElement.href = item._id;

        // 가격을 감싸는 label 요소 생성
        const priceLavel = document.createElement("label");
        priceLavel.classList.add("price");
        if (item.discountRate) {
          // 할인율을 표시하는 h2 요소 생성
          const discountElement = document.createElement("h2");
          discountElement.classList.add("discount");
          discountElement.textContent = `${item.discountRate}%`;

          // 할인된 가격을 표시하는 h4 요소 생성
          const discountPriceElement = document.createElement("h4");
          discountPriceElement.classList.add("discountPrice");
          discountPriceElement.textContent = `${
            Math.floor(
              (item.originPrice * (1 - item.discountRate / 100)) / 100
            ) * 100
          }원`;

          // 원가를 표시하는 span 요소 생성
          const priceElement = document.createElement("h6");
          priceElement.classList.add("basicPrice");
          priceElement.textContent = `${item.originPrice}원`;

          // imgContainer에 이미지, 이름, 가격 라벨 추가
          imgContainer2.appendChild(imgElement);
          imgContainer2.appendChild(nameElement);
          imgContainer2.appendChild(priceLavel);

          // priceLavel에 할인율, 할인된 가격, 원가 추가
          priceLavel.appendChild(discountElement);
          priceLavel.appendChild(discountPriceElement);
          priceLavel.appendChild(priceElement);

          // imgContainer1에 imgContainer2 추가
          imgContainer1.appendChild(imgContainer2);
        } else {
          // 원가를 표시하는 span 요소 생성
          const priceElement = document.createElement("h2");
          priceElement.classList.add("discount");
          priceElement.textContent = `${item.originPrice}원`;

          // imgContainer에 이미지, 이름, 가격 라벨 추가
          imgContainer2.appendChild(imgElement);
          imgContainer2.appendChild(nameElement);
          imgContainer2.appendChild(priceLavel);

          // priceLavel에 원가 추가
          priceLavel.appendChild(priceElement);

          // imgContainer1에 imgContainer2 추가
          imgContainer1.appendChild(imgContainer2);
        }
      });
    } else {
      // 검색 결과가 없는 경우에 대한 처리
      const noResultElement = document.createElement("p");
      noResultElement.textContent = "검색 결과가 없습니다.";
      imgContainer1.appendChild(noResultElement);
    }
  } catch (error) {
    console.error("에러 발생", error);
  }
}

function performSearch(event) {
  if (event.key === "Enter") {
    const searchInput = document.querySelector(".keyword");
    const searchQuery = searchInput.value;

    // 검색어가 비어있지 않은 경우에만 검색 수행
    if (searchQuery.trim() !== "") {
      fetchAndSearchImages(searchQuery);
    }
  }
}

//검색 버튼 클릭 이벤트 리스너 등록
const searchButton = document.querySelector(".fa-search");
searchButton.addEventListener("click", performSearch);

//키보드 이벤트 리스너 등록 (keyup 이벤트)
const searchInput = document.querySelector(".keyword");
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    performSearch();
  }
});
