const customers = getCustomers();
const orders = getOrders();

function displayPayments() {
    const display = document.getElementById("display");
    display.innerHTML = "";

    orders.forEach(payment => {
        const row = document.createElement("tr");
        const statusCell = payment.status === "completed" ? "Paid" : "pending";

        row.innerHTML = `
          <td>${payment.orderNumber}</td>
          <td>${payment.customerName}</td>
          <td>${payment.totalPrice}</td>
          <td>${payment.dateCreated}</td>
          <td>${statusCell}</td>
        `

        display.appendChild(row);
    });
}

displayPayments();