const customers = JSON.parse(localStorage.getItem("customer")) || [];
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const searchInput = document.getElementById('search');
const addCustomerBtn = document.getElementById('addCustomerBtn');
addCustomerBtn.addEventListener('click', addCustomer);

let editCustomerId = null;

function addCustomer() {
    const name = nameInput.value.trim()
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();


    if (name === "") {
        alert("please enter name");
        return false;
    }
    if (phone === "") {
        alert("please enter phone");
        return false;
    }
    if (email === "") {
        alert("please enter email");
        return false;
    }

    const date = new Date();

    const customer = {
        id: Date.now(),
        name: name,
        phone: phone,
        email: email,
        date: date.toLocaleDateString(),

    }

    if (editCustomerId === null) {
        customers.push(customer);
    } else if (editCustomerId !== null) {
        const customer = customers.find(customer => customer.id === editCustomerId);

        if (customer) {
            customer.name = name;
            customer.phone = phone;
            customer.email = email;
        }

        editCustomerId = null;
        addCustomerBtn.textContent = "Add Customer";

    }

    localStorage.setItem("customer", JSON.stringify(customers));
    displayCustomers();

    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";

    console.log(customer.date);
}

console.log(customers.length);


function displayCustomers(toDisplay = customers) {
    const display = document.getElementById("displayCustomers");
    display.innerHTML = "";

    toDisplay.forEach((customer, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
           <td>${index + 1}</td>
           <td>${customer.name}</td>
           <td>${customer.phone}</td>
           <td>${customer.email}</td>
        `;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.id = "editBtnbtn";
        editBtn.addEventListener('click', () => editCustomers(customer.id));
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = "deleteBtnbtn";
        deleteBtn.addEventListener('click', () => deleteCustomer(customer.id));

        const actionsCell = document.createElement("td");
        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        display.appendChild(row);
    });

}
displayCustomers();

function deleteCustomer(id) {
    const customerIndex = customers.findIndex(customer => customer.id === id);


    if (customerIndex !== -1) {
        customers.splice(customerIndex, 1);
        localStorage.setItem("customer", JSON.stringify(customers));
        displayCustomers();
    }

}

//search customers
searchInput.addEventListener('input', searchCustomer);

function searchCustomer() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredSearch = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchText)
        ||
        customer.phone.includes(searchText)
        ||
        customer.email.toLowerCase().includes(searchText)
    );
    displayCustomers(filteredSearch);

}


function editCustomers(id) {
    const customer = customers.find(customer => customer.id === id);

    console.log('edit button clicked');

    if (!customer) return;

    nameInput.value = customer.name;
    phoneInput.value = customer.phone;
    emailInput.value = customer.email;

    editCustomerId = customer.id;

    addCustomerBtn.textContent = "Update Customer";
}

