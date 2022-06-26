let carts = document.querySelectorAll('.addcart')

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(liste[i]);
        totalCost(liste[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

// Pannier Product Number

function cartNumbers(liste, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(liste);
}

// Set Product in Pannier

function setItems(liste) {
    // let productNumbers = localStorage.getItem('cartNumbers');
    // productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = liste.details;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: liste
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        liste.inCart = 1;
        cartItems = { 
            [liste.details]: liste
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// Set Prix Total 

function totalCost(liste, action) {
    let cart = localStorage.getItem("totalCost");

    if (action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - liste.prix);
    } else if (cart != null) {

        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + liste.prix);

    } else {
        localStorage.setItem("totalCost", liste.prix);
    }
}

// Display Pannier

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = Math.round((cart) * 100) / 100;

    let TAUX_TPS = 0.05;
    let TAUX_TVQ = 0.09975;
    var totalTPS = cart * TAUX_TPS;
    var totalTVQ = cart * TAUX_TVQ;
    var total = cart + totalTPS + totalTVQ;

    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item, index) => {



            productContainer.innerHTML +=
                `<div class="product"><img src="../images/${item.image}" />
                <span class="sm-hide">${item.description}</span>
            </div>
            <div class="price sm-hide">${item.prix} $</div>
            <div class="quantity">
                    <span>${item.inCart}</span>
            </div>
            <div class="total">${Math.round((item.inCart * item.prix) * 100) / 100} $</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer" >
                <div align="right">
                    <table class="table" >
                        <tr>
                            <th>Products Total : &nbsp;&nbsp;</th>
                            <th>  ${cart} $</th>
                        </tr>
                        <tr>
                            <th>Taux TPS : </th>
                            <th>&nbsp;&nbsp; ${TAUX_TPS} $</th>
                        </tr>
                        <tr>
                            <th>Taux TPQ : </th>
                            <th>&nbsp;&nbsp; ${TAUX_TVQ} $</th>
                        </tr>
                        <tr>
                            <th>Total Net : </th>
                            <th>&nbsp;&nbsp; ${Math.round((total) * 100) / 100} $ </th>
                        </tr>
                    </table>
                </div>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

// Change Quantity

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
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
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

// Delete Product

function clrstorage() {
    localStorage.clear();
}

onLoadCartNumbers();
displayCart();













