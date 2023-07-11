// 업데이트 날짜 순서로 new product 생성
async function fetchTest() {
    try {
        const res = await fetch('http://127.0.0.1:5555//api/categories', {
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
          });
          const datas = await res.json();
          const data = datas.data
          console.log('datas', datas);
          console.log('data', data);
          categoryAdd(data)
    } catch (error) {
      console.error('get 에러 발생', error);
    }
  }

fetchTest();

//카테고리데이터를 받아 카테고리 만들기

function categoryAdd(data){
    const category = document.querySelector('.category');
    for(let i = 0; i < data.length; i++){
        const categoryContent = document.createElement('a');
        categoryContent.innerHTML = `${data[i].name}`;
        categoryContent.classList.add(`${data[i].name}`);
        category.appendChild(categoryContent);
        categoryList.push('categoryContent');
        for(let cate of categoryList){
            category.appendChild(cate);
        }
    }
    // 카테고리 클릭 시 글자색 변화
    categoryLinks = document.querySelectorAll('.category a');
    categoryLinks.forEach((link) => {
        link.addEventListener('click',function(){
            this.classList.toggle('clicked');
        })
    })
}






// 