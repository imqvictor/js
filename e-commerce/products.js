const products = document.querySelector('.products');
const apiURL = "https://dummyjson.com/products";
console.log(apiURL);

async function searchProducts() {
    const request = apiURL;
    const response = await fetch(request);
    const data = await response.json();

    products.innerHTML = "";

    console.log(data.products);
    data.products.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.className = "productContainer";
        productContainer.innerHTML = `
        <img src="${product.images[0]}" width="200" height="200" alt="${product.title}">
        <p>Title: ${product.title}</p>
        <p>Category: ${product.category}</p>
        `
        products.appendChild(productContainer);
    })
}
searchProducts();