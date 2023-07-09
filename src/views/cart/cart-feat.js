const carts = document.querySelectorAll('.add-cart');

const itemImg = document.querySelector('#item-img');
const itemName = document.querySelector('#item-name');
const itemPrice = document.querySelector('#order-price');
const deliveryFee = document.querySelector('#delivery');
const totalPrice = document.querySelector('#item-img');
const cbArr = document.getElementsByName('price');

// 장바구니에 담겨있는 임시 데이터
const salad = [
    { imgSrc: 'https://via.placeholder.com/150', name: "닭가슴살 샐러드 ", price: 18900, quantity: 1, delivery: 3500, tag: "cSalad", inCart: 0 },
    { imgSrc: 'https://via.placeholder.com/150', name: "단호박 샐러드", price: 15800, quantity: 3, delivery: 3500, tag: "sSalad",  inCart: 0 },
    { imgSrc: 'https://via.placeholder.com/150', name: "리코타치즈 샐러드", price: 19800, quantity: 5, delivery: 3500, tag: "lSalad", inCart: 0  },
];

// 장바구니 클릭
carts.forEach((v, i)=>{
    v.addEventListener('click', () => {
        cartNumbers(salad[i]);
        totalCost(salad[i]);
    })
})

// 장바구니 개수 출력
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

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

// 장바구니 데이터 set
function setItems(product) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// 장바구니에 담긴 물건의 총 금액
function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

// 장바구니 데이터 출력
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('tbody');
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if ( productNumbers === 0 ) {
        productContainer.innerHTML += `<tr class="empty-cart">
            <td colspan="7" style="text-align: center;>
                <p>장바구니에 담긴 상품이 없습니다.</p>
            </td>
        </tr>`;
    }
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (v, i) => {
            productContainer.innerHTML += 
            `<tr class="exist-cart">
        <td class="item-chk">
            <div class="item-chkbox">
                <input type="checkbox" name="price" id="chknum${i}" value="${v.inCart}" onclick="calcPrice()">
                <label for="chknum${i}"></label>
            </div>
        </td>
        <td class="item-info product">
            <a href="#">
                <div id="item-img"><img src='${v.imgSrc}' alt=""></div>
                <div id="item-des">
                    <p class="item-name">${v.name}</p>
                </div>
            </a>
        </td>
        <td class="order-amount">
            <div class="each">
                <img src="./assets/add.png" class="decrease" id="btn-up">
                    <span>${v.inCart}</span>
                <img src="./assets/remove.png" class="increase" id="btn-down">
            </div>
        </td>
        <td>
            <p>${v.price}</p>
        </td>
        <td class="delivery">
            <p id="delivery">${v.delivery}</p>
        </td>
        <td>
            <p id="order-price${i}" style="color: orange; font-weight: 700;">${ v.price * v.inCart + v.delivery}</p>
        </td>
        <td>
            <span class="del-btn">삭제하기</span>
        </td>
    </tr>
        `;
        });
        
        document.getElementById('receipt-price').innerText = cart + "원";
        document.getElementById('receipt-delivery').innerText = 3500 + "원";
        document.getElementById('receipt-total').innerText = cart + 3500 + "원";
        
        deleteButtons();
        manageQuantity();
    } 
}

// 장바구니 수량 변경
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
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

// 장바구니 데이터 삭제
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('td .del-btn');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            // console.log(deleteButtons[i].parentElement.textContent);
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

// 장바구니 상품 전체 삭제
function itemClear() {
    localStorage.clear();
}

onLoadCartNumbers();
displayCart();

