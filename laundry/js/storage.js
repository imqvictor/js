function getCustomers() {
    return JSON.parse(localStorage.getItem("customers")) || [];
}
function getOrders() {
    return JSON.parse(localStorage.getItem("orders")) || [];
}
