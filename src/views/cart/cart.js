const salad = [
    { imgSrc: 'https://via.placeholder.com/150', name: "닭가슴살 샐러드 ", price: 18900, quantity: 1, delivery: 3500 },
    { imgSrc: 'https://via.placeholder.com/150', name: "단호박 샐러드", price: 15800, quantity: 3, delivery: 3500 },
    { imgSrc: 'https://via.placeholder.com/150', name: "리코타치즈 샐러드", price: 19800, quantity: 5, delivery: 3500 },
];

const itemImg = document.querySelector('#item-img');
const itemName = document.querySelector('#item-name');
const itemPrice = document.querySelector('#order-price');
const deliveryFee = document.querySelector('#delivery');
const totalPrice = document.querySelector('#item-img');


let total = 0;
let count = 0;

salad.forEach()

//     for(var i=0; i<salad.length; i++){
//         if(salad[i].checked) {
//             total += parseInt(inputList[i].value);
//             count += 1;
//         }
//     }
//     total = total.toLocaleString();
//     totals.innerText = `total: ${total}원`;
//     counts.innerText = `총 : ${count} 개`;

// `

// fetch('http://127.0.0.1:5555/api/products', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
// })
//   .then((res) => res.json())
//   .then((data) => {
//     const saladInfo = data; 
    
//     document.querySelector('#input').textContent = saladInfo.length; 

//   })`