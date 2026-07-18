<?php
require_once __DIR__ . '/../auth/session.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>laundry management system</title>
    <link rel="stylesheet" href="../assets/css/global.css">
    <link rel="stylesheet" href="../assets/css/customers.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <nav>
        <div>
            <h3>Laundry Management System</h3>
        </div>

        <div>
            <ul>
                <li><a href="dashboard.php" class="links">Dashboard</a></li>
                <li><a href="customers.php" class="links">Customers</a></li>
                <li><a href="orders.php" class="links">Orders</a></li>
                <li><a href="payment.php" class="links">Payment</a></li>
                <li><a href="../auth/logout.php" class="links">Logout</a></li>
                <li><a href=""><i class="fa-solid fa-bars"></i></a></li>
            </ul>
        </div>
    </nav>

    <div class="card">
        <div class="customer-nav">
            <h3>Customer Management</h3>
            <input type="text" id="name" placeholder="Enter a name">
            <input type="number" id="phone" placeholder="Enter a phone number">
            <input type="email" id="email" placeholder="Enter an email">

        </div>

        <div class="inner-nav">
            <div class="innCustomer-nav">
                <p>Customers</p>
                <button id="addBtn">Add button </button>
                <input type="search" id="searchCustomer" placeholder="search for customers">
            </div>
            <table id="customersTable" border="1">
                <thead>
                    <th>NO</th>
                    <th>NAME</th>
                    <th>PHONE</th>
                    <th>EMAIL</th>
                    <th>DATE REGISTERED</th>
                    <th>ACTIONS</th>
                </thead>
                <tbody id="displayCustomers"></tbody>
            </table>
        </div>

    </div>
    <script src="../assets/js/storage.js"></script>
    <script src="../assets/js/customers.js"></script>
</body>

</html>
