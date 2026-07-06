const customers = getCustomers();
const orders = getOrders();
const selectCustomer = document.getElementById("selectCustomer");

function loadCustomers() {

    selectCustomer.innerHTML = ` <option value="">Select Customer</option>`;

    customers.forEach(customer => {
        const option = document.createElement("option");

        //store the customer id as the value
        option.value = customer.name;

        //Display the customer name in the dropdown
        option.textContent = customer.name;

        selectCustomer.appendChild(option);
    });
}
loadCustomers();

console.log(customers.length);

const selectLaundry = document.getElementById("selectLaundry");
const quantityInput = document.getElementById("Quantity");
const priceInput = document.getElementById("price");
const addOrderBtn = document.getElementById("addOrderBtn");
addOrderBtn.addEventListener('click', addOrder);
const dateInput = document.getElementById("date");

const totalPriceElement = document.getElementById("totalPrice");

function updateTotalPrice() {
    const quantityCalculate = parseFloat(quantityInput.value) || 0.0;
    const priceCalculate = parseFloat(priceInput.value) || 0.0;
    const totalPrice = quantityCalculate * priceCalculate;
    totalPriceElement.textContent = totalPrice.toFixed(2);
}
quantityInput.addEventListener('input', updateTotalPrice);
priceInput.addEventListener("input", updateTotalPrice);

function addOrder() {
    const selectLaundryType = selectLaundry.value.trim();
    const quantity = quantityInput.value.toString().trim();
    const price = priceInput.value.toString().trim();
    const customer = selectCustomer.value.trim();
    const date = dateInput.value.toString().trim();

    if (customer === "") {
        alert("please select a customer");
        return false;
    }
    if (selectLaundryType === "") {
        alert("please selectlanundry type");
        return false;
    }
    if (quantity === "") {
        alert("plaese enter a Quantity");
        return false;
    }
    if (price === "") {
        alert("please enter a price");
        return false;
    }
    if (date === "") {
        alert("please enter a date");
        return false;
    }

    const quantityCalculate = parseFloat(quantityInput.value) || 0;
    const priceCalculate = parseFloat(priceInput.value) || 0;
    const totalPrice = quantityCalculate * priceCalculate;

    const order = {
        id: orders.length + 1,
        customerName: customer,
        laundryType: selectLaundryType,
        quantity: quantity,
        price: price,
        totalPrice: totalPrice,
        date: date
    }
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    selectLaundry.value = "";
    quantityInput.value = "";
    priceInput.value = "";
    selectCustomer.value = "";
    dateInput.value = "";
    totalPriceElement.textContent = "0";

    console.log(order.laundryType);
    displayOrders();
}

function displayOrders(ordersToDisplay = orders) {
    const displayOrders = document.getElementById("displayOrders");
    displayOrders.innerHTML = "";

    ordersToDisplay.forEach(order => {
        const listedOrders = document.createElement("li");
        listedOrders.textContent = `
        id:${order.id},
        customerName:${order.customerName},
        laundryType:${order.laundryType},
        price:${order.price},
        quantity:${order.quantity},
        totalPrice:${order.totalPrice},
        Date:${order.date}
        `
        displayOrders.appendChild(listedOrders);

        const deletBtn = document.createElement("button");
        deletBtn.textContent = "Delete";
        deletBtn.addEventListener('click', () => deleteOrder(order.id));

        listedOrders.appendChild(deletBtn);

    })
}
displayOrders();

function deleteOrder(id) {
    const idIndex = orders.findIndex(order => order.id === id);

    if (idIndex !== -1) {
        orders.splice(idIndex, 1);

        localStorage.setItem("orders", JSON.stringify(orders));
        displayOrders();
    }
}

//search order
const searchInput = document.getElementById("searchOrder");
searchInput.addEventListener("input", searchOrder);

function searchOrder() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filtered = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchText)
        ||
        order.laundryType.toLowerCase().includes(searchText)
        ||
        order.quantity.includes(searchText)
        ||
        order.price.includes(searchText)
    );
    displayOrders(filtered)
}
