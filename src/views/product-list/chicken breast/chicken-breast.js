
let chickenBreastInfo = [
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
]

for (let i = 0; i < chickenBreastInfo.length; i++) {
  document.getElementById("chickenBreast").innerHTML += `
    <li>
      <a href="javascript:void(0)">
        <img src= ${chickenBreastInfo[i].imgSrc} alt="" />
        <h3>${chickenBreastInfo[i].name}</h3>
      </a>
      <div class="cart">
        <a href="javascript:void(0)">
          <img src="../images/cart_icn.png" alt="">
        </a>
      </div>
      <span>${chickenBreastInfo[i].discountRate}%</span>
      <strong>
        ${chickenBreastInfo[i].price}<span>원</span>
        <b>${chickenBreastInfo[i].originalPrice}원</b>
      </strong>
    </li>
  `
}

document.querySelector('.list-num').textContent = chickenBreastInfo.length; 