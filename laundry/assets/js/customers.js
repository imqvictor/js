const customers = getCustomers();
const orders = getOrders();
console.log(customers.length);
const nameInput = document.getElementById("name");
const phoneINput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addCustomerBtn = document.getElementById("addBtn");
addCustomerBtn.addEventListener("click", addCustomer);

function addCustomer() {
    const name = nameInput.value.trim();
    const phone = phoneINput.value.toString().trim();
    const email = emailInput.value.trim();

    if (name === "") {
        alert("Please Enter a name");
        return false;
    }
    if (phone === "") {
        alert("please enter a phone number");
        return false;
    }
    if (email === "") {
        alert("please enter an email");
        return false;
    }

    const now = new Date();

    const customer = {
        id: Date.now(),
        name: name,
        phone: phone,
        email: email,
        dateCreated: now.toLocaleString("en-KE", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        })
    };
    customers.push(customer);
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();

    nameInput.value = "";
    phoneINput.value = "";
    dateInput.value = "";
    emailInput.value = "";
}

function displayCustomers(customersToDisplay = customers) {
    const displayCustomers = document.getElementById("displayCustomers");
    displayCustomers.innerHTML = "";

    customersToDisplay.forEach((customer, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${customer.name}</td> 
          <td>${customer.phone}</td> 
          <td>${customer.email}</td> 
          <td>${customer.dateCreated}</td> 
         `

        const btnCell = document.createElement("td")
        const divBtn = document.createElement("div");
        btnCell.appendChild(divBtn);


        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.id = "editBtnId";
        divBtn.appendChild(editBtn);
        divBtn.id = "btnClass";

        const deletBtn = document.createElement("button");
        deletBtn.textContent = "Delete";
        deletBtn.id = "deletBtnId";
        deletBtn.addEventListener('click', () => deletCustomer(customer.id));
        divBtn.appendChild(deletBtn);


        row.appendChild(btnCell);
        displayCustomers.appendChild(row);
    });

}
displayCustomers();

function deletCustomer(id) {
    const index = customers.findIndex(customer => customer.id === id);

    if (index !== -1) {
        customers.splice(index, 1);

        //remove every order belonging to the deleted customer
        const remainingOrders = orders.filter(order => order.customerId !== id);

        //update the orders array with the remaining orders
        orders.length = 0;
        orders.push(...remainingOrders);

        //save the updated customers and orders arrays to localStorage
        localStorage.setItem("customers", JSON.stringify(customers));
        localStorage.setItem("orders", JSON.stringify(orders));
        displayCustomers();
    }
}

const searchInput = document.getElementById("searchCustomer");
searchInput.addEventListener('input', searchCustomer);

function searchCustomer() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredSearch = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchText)
        ||
        customer.phone.includes(searchText)
        ||
        customer.email.toLowerCase().includes(searchText)
        ||
        customer.dateCreated.toLowerCase().includes(searchText)
    );

    displayCustomers(filteredSearch);
}




