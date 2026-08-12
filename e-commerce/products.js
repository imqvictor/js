
const cartItems = JSON.parse(localStorage.getItem('cartProduct')) || [];
const productt = document.querySelector('.products');
const cart = document.querySelector('.cart');
const apiURL = "https://dummyjson.com/products";
console.log(apiURL);
let products = [];


async function fetchProducts() {

    const storedProducts = JSON.parse(localStorage.getItem('item'));

    if (storedProducts) {
        console.log('loading products from localStorage');
        console.log(storedProducts);

        //asign the products array the stored data
        products = storedProducts;

        displayProducts(storedProducts);
        return;
    }

    const request = apiURL;
    const response = await fetch(request);
    const data = await response.json();

    //asign the products array the fetched data
    products = data.products;

    //after fetching the products store them to the local storage
    localStorage.setItem('item', JSON.stringify(products));

    displayProducts(products);

}


function displayProducts(toDisplay = products) {
    productt.innerHTML = "";

    toDisplay.forEach(product => {

        const productContainer = document.createElement('div');
        productContainer.className = "productContainer";
        productContainer.innerHTML = `
        <img src="${product.images[0]}" width="200" height="200" alt="${product.title}">
        <p>${product.title}</p>
        <p>${product.description}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        `
        const addBtn = document.createElement('button');
        addBtn.textContent = "ADD TO CART";
        addBtn.id = 'addBtn';
        addBtn.addEventListener('click', () => {

            const existingItem = cartItems.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity++;
                localStorage.setItem('cartProduct', JSON.stringify(cartItems));
                console.log('item exists');
                console.log(cartItems);
            }
            const cartItem = {
                ...product,
                quantity: 1
            };
            cartItems.push(cartItem);
            localStorage.setItem('cartProduct', JSON.stringify(cartItems));
            console.log('Add a new item');
            console.log(cartItems.length);
        })


        productContainer.appendChild(addBtn);
        productt.appendChild(productContainer);
    })

    productt.hidden = false;
    cart.hidden = true;
}

fetchProducts();

//saerch for products
const searchInput = document.getElementById('search');
searchInput.id = "searchInput";
searchInput.addEventListener('input', () => {
    const textInput = searchInput.value.trim().toLowerCase();

    const filteredText = products.filter(product => {
        return product.title.toLowerCase().includes(textInput) ||
            product.category.toLowerCase().includes(textInput) ||
            product.price.toString().includes(textInput) ||
            product.description.toLowerCase().includes(textInput)
    })
    displayProducts(filteredText);
});

//filter products by category
const selectInput = document.getElementById('select');
selectInput.id = "selectInput";
selectInput.addEventListener('change', () => {
    const categoryInput = selectInput.value.toLowerCase();

    let filteredCategory;
    if (categoryInput === "all") {
        filteredCategory = products;
    } else {
        filteredCategory = products.filter(product => product.category === categoryInput);
    }
    displayProducts(filteredCategory);
    console.log("change event triggered");
});


//Go to cart button
const cartBtn = document.getElementById('cartBtn');
cartBtn.className = 'absolute';
cartBtn.id = "one";

cartBtn.addEventListener('click', () => {
    if (productt.hidden === false) {
        productt.hidden = true;
        cart.hidden = false;
        cartBtn.textContent = "GO BACK TO SHOPPING";
    } else {
        productt.hidden = false;
        cart.hidden = true;
        cartBtn.textContent = "GO TO CART";
    }

});


function displayCartItems() {
    cart.innerHTML = "";

    cartItems.forEach(item => {

        const totalPrice = Number(item.price * item.quantity);

        const cartContainer = document.createElement('div');
        cartContainer.id = 'cartContainer';
        cartContainer.innerHTML = `
        <img src="${item.images[0]}" width="200" height="200" alt="${item.title}">
        <p>${item.title}</p>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>${item.quantity}</p>
        <p>${totalPrice}</p>
        `

        const add = document.createElement('button');
        add.textContent = "+";
        add.addEventListener('click', () => {
            item.quantity++;
            localStorage.setItem('cartProduct', JSON.stringify(cartItems));
            displayCartItems();
            console.log('quantity added');
        });

        const minus = document.createElement('button');
        minus.textContent = "-";
        minus.addEventListener('click', () => {

            if (item.quantity > 1) {
                item.quantity--;
            }
            localStorage.setItem('cartProduct', JSON.stringify(cartItems));
            displayCartItems();
            console.log('quantity substracted');
        });

        const buttonsDiv = document.createElement('div');
        buttonsDiv.id = 'buttonsDiv';
        buttonsDiv.appendChild(minus);
        buttonsDiv.appendChild(add);
        cartContainer.appendChild(buttonsDiv);
        cart.appendChild(cartContainer);
    });
}
displayCartItems();