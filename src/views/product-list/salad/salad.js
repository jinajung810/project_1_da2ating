
let saladInfo = [
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
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드6',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드7',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드8',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
  {
    imgSrc: '../images/salad-list-item01.jpg',
    name: '크래미 샐러드9',
    discountRate: 23,
    price: '6,900',
    originalPrice: '9,000',
  },
]

for (let i = 0; i < saladInfo.length; i++) {
  document.getElementById("salad").innerHTML += `
    <li>
      <a href="javascript:void(0)">
        <img src= ${saladInfo[i].imgSrc} alt="" />
        <h3>${saladInfo[i].name}</h3>
      </a>
      <div class="cart">
        <a href="javascript:void(0)">
          <img src="../images/cart_icn.png" alt="">
        </a>
      </div>
      <span>${saladInfo[i].discountRate}%</span>
      <strong>
        ${saladInfo[i].price}<span>원</span>
        <b>${saladInfo[i].originalPrice}원</b>
      </strong>
    </li>
  `
}

document.querySelector('.list-num').textContent = saladInfo.length; 