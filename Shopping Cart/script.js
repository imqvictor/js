

const products = [
    {
        id: 1,
        name: "headphone",
        price: 150,
        image: "images/headphone.jpg"
    },
    {
        id: 2,
        name: "mobile phone",
        price: 200,
        image: "images/mobile.jpg"
    },
    {
        id: 3,
        name: "laptop",
        price: 500,
        image: "images/laptop.jpg"
    },
    {
        id: 4,
        name: "backpack",
        price: 80,
        image: "images/backpack.jpg"
    },
];


const cartItems = JSON.parse(localStorage.getItem('item')) || [];
const productContainer = document.querySelector('.productContainer');
const cart = document.querySelector('.cart');
const total = document.getElementById('total');
const card = document.querySelector('.card');

function displayProducts() {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
        <img src="${product.image}" width="100px"></img>
        <p>${product.name}</p>
        <p>$ ${product.price}</p>
        `
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = "ADD TO CART";
        addToCartBtn.id = "addToCart";
        addToCartBtn.addEventListener('click', () => {

            const existingItem = cartItems.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
                localStorage.setItem('item', JSON.stringify(cartItems));
                console.log("The item already exists");
                console.log(cartItems);
            } else {
                const cartItem = {
                    ...product,
                    quantity: 1
                }
                cartItems.push(cartItem);
                console.log("Add a new item");
                localStorage.setItem('item', JSON.stringify(cartItems));
                console.log(cartItems);

            }

        })

        productDiv.appendChild(addToCartBtn);
        productContainer.appendChild(productDiv);
    })


    const showCartBtn = document.createElement('button');
    showCartBtn.textContent = "GO TO CART";
    productContainer.insertBefore(showCartBtn, productContainer.firstChild);

    showCartBtn.addEventListener('click', () => {
        productContainer.hidden = true;
        cart.hidden = false;

        displayCart();
    });
}
displayProducts();




function displayCart() {
    cart.innerHTML = "";

    cartItems.forEach(item => {
        const totalItemPrice = Number(item.price * item.quantity);
        console.log(totalItemPrice);

        const cartDiv = document.createElement('div');
        cartDiv.innerHTML = `
         <img src="${item.image}" width="100px" class="imge"></img>
         <p>${item.name}</p>
         <p>$ ${item.price}</p>   
         <p>${item.quantity}</p>   
          <p>Total Price: $${totalItemPrice}</p>     
       `

        const add = document.createElement('button');
        add.textContent = "+";
        add.addEventListener('click', () => {
            item.quantity++;
            localStorage.setItem('item', JSON.stringify(cartItems));
            console.log(cartItems);
            displayCart();
        })
        const minus = document.createElement('button');
        minus.textContent = "-";
        minus.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
            }

            localStorage.setItem('item', JSON.stringify(cartItems));
            console.log(cartItems);
            displayCart();
        })

        localStorage.setItem('item', JSON.stringify(cartItems));
        cartDiv.appendChild(minus);
        cartDiv.appendChild(add);
        cart.appendChild(cartDiv);
    })

    const backToshop = document.createElement('button');
    backToshop.textContent = "Back To Shop";
    backToshop.addEventListener('click', () => {
        cart.hidden = true;
        productContainer.hidden = false;
        displayProducts();
    })
    cart.insertBefore(backToshop, cart.firstChild);
}
