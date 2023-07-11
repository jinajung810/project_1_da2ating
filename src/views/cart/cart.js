const carts = document.querySelectorAll('.add-cart');

const itemImg = document.querySelector('#item-img');
const itemName = document.querySelector('#item-name');
const itemPrice = document.querySelector('#order-price');
const deliveryFee = document.querySelector('#delivery');
const totalPrice = document.querySelector('#item-img');
const cbArr = document.getElementsByName('price');

// 장바구니에 담겨있는 임시 데이터
const salad = [
    { imgSrc: 'https://via.placeholder.com/150', name: "닭가슴살 샐러드 ", price: 18900, quantity: 1, delivery: 3500, inCart: 0 },
    { imgSrc: 'https://via.placeholder.com/150', name: "단호박 샐러드", price: 15800, quantity: 3, delivery: 0, inCart: 0 },
    { imgSrc: 'https://via.placeholder.com/150', name: "리코타치즈 샐러드", price: 19800, quantity: 5, delivery: 3500, inCart: 0  },
];

// 장바구니 클릭
carts.forEach((v, i)=>{
    v.addEventListener('click', () => {
        cartNumbers(salad[i]);
        totalCost(salad[i]);
    })
})

// 장바구니 개수 출력
function onLoadCartNumbers() {}

// 장바구니 
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}


// 상품 부분 선택 합계
function calcPrice() {
    let receiptPrice = 0;
    let receiptTotal = 0;
    let receiptDelivery = 0;
    let priceArr = new Array();
    cbArr.forEach((v, i) => {
        if (v.checked == true) {
            let itemId = v.id.replace('chknum', 'order-price');
            let priceTag = document.getElementById(itemId).innerText;
            priceArr.push(priceTag);
        }
    })

    priceArr.forEach((v, i) => {
        receiptPrice += parseInt(v);
    })

    document.querySelector('#receipt-price').innerText = receiptPrice + "원";
    
    // 배송비 조건
    if (receiptPrice >= 50000) {
        receiptDelivery = 0;
    } else if (receiptPrice === 0) {
        receiptDelivery = 0;
    } else {
        receiptDelivery = 3500;
    }

    receiptTotal = receiptPrice + receiptDelivery;

    document.getElementById('receipt-delivery').innerText = receiptDelivery + "원";
    document.getElementById('receipt-total').innerText = receiptTotal + "원";

}

// 상품 모두 선택
function allChk(allChk) {
    cbArr.forEach((checkbox)=> {
        checkbox.checked = allChk.checked;
    })
}



// 장바구니 페이지 rendering
function cartPage() {
    salad.forEach((v, i) => {
        document.querySelector('tbody').innerHTML += `<tr class="exist-cart">
        <td class="item-chk">
            <div class="item-chkbox">
                <input type="checkbox" name="price" id="chknum${i}"  value="${v.itemPrice}" onclick="calcPrice()">
                <label for="chknum${i}"></label>
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
                <button type="button" name="button" class="btn_up"><img src="./assets/add.png" alt=""></button>
                <input type="text" id="orderstyle_163190659" value="${v.quantity}" data-rowcnt="0" readonly="readonly">
                <button type="button" name="button" class="btn_down" onclick=""><img src="./assets/remove.png" alt=""></button>
            </div>
        </td>
        <td>
            <p>${v.price}</p>
        </td>
        <td class="delivery">
            <p id="delivery">${v.delivery}</p>
        </td>
        <td>
            <p id="order-price${i}" style="color: orange; font-weight: 700;">${ v.price * v.quantity + v.delivery}</p>
        </td>
        <td>
            <a href="javascript:void(0)" class="del-btn">삭제하기</a>
        </td>
    </tr>
        `;
    
        
    })
}


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

cartPage();