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
    <link rel="stylesheet" href="../assets/css/dashboard.css">
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

    <div class="container">
        <div class="dash-heading">
            <h2>Dashboard</h2>
            <h3 class="nav-user">Welcome, <?= htmlspecialchars($_SESSION['username']) ?></h3>
            <p>Overview of your laundry business performance.</p>
        </div>

        <div id="statistic-cards">
        </div>

        <script src="../assets/js/storage.js"></script>
        <script src="../assets/js/dashboard.js"></script>
</body>

</html>
