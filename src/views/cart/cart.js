// 장바구니에 담겨있는 임시 데이터
const salad = [
    { imgSrc: 'https://via.placeholder.com/150', name: "닭가슴살 샐러드 ", price: 18900, quantity: 1, delivery: 3500 },
    { imgSrc: 'https://via.placeholder.com/150', name: "단호박 샐러드", price: 15800, quantity: 3, delivery: 0 },
    { imgSrc: 'https://via.placeholder.com/150', name: "리코타치즈 샐러드", price: 19800, quantity: 5, delivery: 3500 },
];

const itemImg = document.querySelector('#item-img');
const itemName = document.querySelector('#item-name');
const itemPrice = document.querySelector('#order-price');
const deliveryFee = document.querySelector('#delivery');
const totalPrice = document.querySelector('#item-img');



salad.forEach((v, i) => {

    document.querySelector('tbody').innerHTML += `<tr class="exist-cart">
    <td class="item-chk">
        <div class="item-chkbox">
            <input type="checkbox" id="chknum1" checked="checked" onclick="">
            <label for="chknum1"></label>
        </div>
    </td>
    <td class="item-info">
        <a href="#">
            <div id="item-img"><img src='${v.imgSrc}' alt=""></div>
            <div id="item-des">
                <p class="item-name">${v.name}</p>
            </div>
        </a>
    </td>
    <td class="order-amount">
        <div class="each">
            <button type="button" name="button" class="btn_up btn_plus"><img src="./assets/add.png" alt=""></button>
            <input type="text" id="orderstyle_163190659" value="${v.quantity}" onchange="WCKBasket.ChangeStock(this, '1', '986','163190659');" data-rowcnt="0" readonly="readonly">
            <button type="button" name="button" class="btn_down btn_minus" onclick=""><img src="./assets/remove.png" alt=""></button>
        </div>
    </td>
    <td class="order-price">
        <p id="order-price">${v.price}</p>
    </td>
    <td class="delivery">
        <p id="delivery">${v.delivery}</p>
    </td>
    <td>
        <p id="total" style="color: orange; font-weight: 700;">${ v.price + v.delivery}</p>
    </td>
</tr>
    `;

    
})



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
