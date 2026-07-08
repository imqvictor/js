const customers = getCustomers();
console.log(customers.length);
const nameInput = document.getElementById("name");
const phoneINput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addCustomerBtn = document.getElementById("addCustomerBtn");
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

    customersToDisplay.forEach(customer => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.id}</td>
          <td>${customer.name}</td> 
          <td>${customer.phone}</td> 
          <td>${customer.email}</td> 
          <td>${customer.dateCreated}</td> 
         `

        const btnCell = document.createElement("td")
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        btnCell.appendChild(editBtn);

        const deletBtn = document.createElement("button");
        deletBtn.textContent = "Delete";
        deletBtn.addEventListener('click', () => deletCustomer(customer.id));
        btnCell.appendChild(deletBtn);


        row.appendChild(btnCell);
        displayCustomers.appendChild(row);
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




