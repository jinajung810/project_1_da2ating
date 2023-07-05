
let snackDressingInfo = [
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드1',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드2',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드3',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드4',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드5',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
]

for (let i = 0; i < snackDressingInfo.length; i++) {
  document.getElementById("snackDressing").innerHTML += `
    <li>
      <a href="javascript:void(0)">
        <img src= ${snackDressingInfo[i].imgSrc} alt="" />
        <h3>${snackDressingInfo[i].name}</h3>
      </a>
      <div class="cart">
        <a href="javascript:void(0)">
          <img src="../images/cart_icn.png" alt="">
        </a>
      </div>
      <span>${snackDressingInfo[i].discountRate}%</span>
      <strong>
        ${snackDressingInfo[i].price}<span>원</span>
        <b>${snackDressingInfo[i].originalPrice}원</b>
      </strong>
    </li>
  `
}

document.querySelector('.list-num').textContent = snackDressingInfo.length; 