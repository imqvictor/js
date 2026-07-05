const customers = JSON.parse(localStorage.getItem("customers")) || [];
console.log(customers.length);
const nameInput = document.getElementById("name");
const phoneINput = document.getElementById("phone");
const dateInput = document.getElementById("date");
const emailInput = document.getElementById("email");
const addCustomerBtn = document.getElementById("addCustomerBtn");
addCustomerBtn.addEventListener("click", addCustomer);

function addCustomer() {
    const name = nameInput.value.trim();
    const phone = phoneINput.value.toString().trim();
    const date = dateInput.value.trim();
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
    if (date === "") {
        alert("please enter a date");
        return false;
    }


    const customer = {
        id: customers.length + 1,
        name: name,
        phone: phone,
        email: email,
        date: date
    }
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

    customersToDisplay.forEach(customer => {
        const info = document.createElement("li");
        info.textContent = `
         ${customer.id}.
          Name:${customer.name},
          Phone:${customer.phone},
          Email:${customer.email},
          Date:${customer.date}
         `
        displayCustomers.appendChild(info);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        info.appendChild(editBtn);

        const deletBtn = document.createElement("button");
        deletBtn.textContent = "Delet";
        info.appendChild(deletBtn);
        deletBtn.addEventListener('click', () => deletCustomer(customer.id));

    });

}
displayCustomers();

function deletCustomer(id) {
    const index = customers.findIndex(customer => customer.id === id);

    if (index !== -1) {
        customers.splice(index, 1);

        localStorage.setItem("customers", JSON.stringify(customers));
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
        customer.date.toLowerCase().includes(searchText)
    );

    displayCustomers(filteredSearch);
}

