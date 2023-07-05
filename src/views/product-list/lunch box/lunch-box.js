
let lunchBoxInfo = [
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
]

for (let i = 0; i < lunchBoxInfo.length; i++) {
  document.getElementById("lunchBox").innerHTML += `
    <li>
      <a href="javascript:void(0)">
        <img src= ${lunchBoxInfo[i].imgSrc} alt="" />
        <h3>${lunchBoxInfo[i].name}</h3>
      </a>
      <div class="cart">
        <a href="#">
          <img src="../images/cart_icn.png" alt="">
        </a>
      </div>
      <span>${lunchBoxInfo[i].discountRate}%</span>
      <strong>
        ${lunchBoxInfo[i].price}<span>원</span>
        <b>${lunchBoxInfo[i].originalPrice}원</b>
      </strong>
    </li>
  `
}

document.querySelector('.list-num').textContent = lunchBoxInfo.length; 