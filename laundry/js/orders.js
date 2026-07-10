const customers = getCustomers();
const orders = getOrders();
const selectCustomer = document.getElementById("selectCustomer");

const customerId = customers.find(customer => customer.customerId);
console.log(customerId);

function loadCustomers() {

    selectCustomer.innerHTML = ` <option value="">Select Customer</option>`;

    customers.forEach(customer => {
        const option = document.createElement("option");

        //store the customer id as the value
        option.value = customer.id;

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
const addOrderBtn = document.getElementById("addBtn");
addOrderBtn.addEventListener('click', addOrder);

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
    const customerId = Number(selectCustomer.value);
    const customer = customers.find(customer => customer.id === customerId);

    console.log(customer.id);
    console.log(customer.name);

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

    const now = new Date();

    const quantityCalculate = parseFloat(quantityInput.value) || 0;
    const priceCalculate = parseFloat(priceInput.value) || 0;
    const totalPrice = quantityCalculate * priceCalculate;


    const order = {
        id: Date.now(),
        orderNumber: `#ORD${String(Date.now()).slice(-6)}`,
        customerId: customer.id,
        customerName: customer.name,
        laundryType: selectLaundryType,
        quantity: quantity,
        price: price,
        totalPrice: totalPrice,
        dateCreated: now.toLocaleString("en-KE", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }),
        status: "pending"
    }

    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    selectLaundry.value = "";
    quantityInput.value = "";
    priceInput.value = "";
    selectCustomer.value = "";
    totalPriceElement.textContent = "0";

    console.log(order.laundryType);
    displayOrders();
}

function displayOrders(ordersToDisplay = orders) {
    const displayOrders = document.getElementById("displayOrders");
    displayOrders.innerHTML = "";

    ordersToDisplay.forEach((order, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td> 
            <td>${order.customerName}</td> 
            <td>${order.quantity}</td>     
            <td>${order.laundryType}</td>     
            <td>${order.price}</td>     
            <td>${order.totalPrice}</td>    
            <td>${order.dateCreated}</td>
`
        displayOrders.appendChild(row);

        const actionCell = document.createElement("td");
        actionCell.id = "actionCellId";
        const actionSelection = document.createElement("select");
        actionSelection.innerHTML = ` 
                    <option value="pending" >Pending</option>
                    <option value="washing">Washing</option>
                    <option value="ironing">Ironing</option>
                    <option value="drying">Drying</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                              `
        actionSelection.value = order.status;

        const currentStatus = document.createElement("td");
        currentStatus.textContent = order.status;

        actionSelection.addEventListener("change", () => {
            console.log("Changed to:", actionSelection.value);
            order.status = actionSelection.value;
            currentStatus.textContent = order.status;

            localStorage.setItem("orders", JSON.stringify(orders));

        });


        const deletBtn = document.createElement("button");
        deletBtn.textContent = "Delete";
        deletBtn.id = "deletBtnId";
        deletBtn.addEventListener('click', () => deleteOrder(order.id));

        actionCell.appendChild(actionSelection);
        actionCell.appendChild(deletBtn);
        row.appendChild(currentStatus);
        row.appendChild(actionCell);

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
        ||
        order.dateCreated.includes(searchText)
    );
    displayOrders(filtered)
}

const searchCategory = document.getElementById("searchCategory");
searchCategory.addEventListener('change', searchByCategory)

function searchByCategory() {
    const filteredSearch = searchCategory.value.toLowerCase();

    let filteredStatus;
    if (filteredSearch === "all") {
        filteredStatus = orders;
    } else {
        filteredStatus = orders.filter(order => order.status === filteredSearch);
    }
    displayOrders(filteredStatus);
}
