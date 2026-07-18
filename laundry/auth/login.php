<?php
require_once __DIR__ . '/../config/database.php';

$errors = [];
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($email === '') {
        $errors[] = 'Email is required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Please enter a valid email address.';
    }

    if ($password === '') {
        $errors[] = 'Password is required.';
    }

    if (empty($errors)) {
        $conn = get_db_connection();
        $stmt = $conn->prepare('SELECT id, username, password FROM users WHERE email = ? LIMIT 1');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->bind_result($userId, $username, $passwordHash);

        if ($stmt->fetch()) {
            if (password_verify($password, $passwordHash)) {
                if (session_status() === PHP_SESSION_NONE) {
                    session_start();
                }
                $_SESSION['user_id'] = $userId;
                $_SESSION['username'] = $username;
                header('Location: ../pages/dashboard.php');
                exit;
            }
        }

        $errors[] = 'Invalid email or password. Please try again.';
        $stmt->close();
        $conn->close();
    }
}

$successMessage = '';
if (isset($_GET['registered']) && $_GET['registered'] === '1') {
    $successMessage = 'Registration successful. Please log in below.';
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Laundry Management</title>
    <link rel="stylesheet" href="../assets/css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <div class="card">
        <h2>Login</h2>
        <?php if ($successMessage): ?>
            <p class="success-message"><?= htmlspecialchars($successMessage) ?></p>
        <?php endif; ?>
        <?php if (!empty($errors)): ?>
            <div class="error-box">
                <ul>
                    <?php foreach ($errors as $error): ?>
                        <li><?= htmlspecialchars($error) ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <form method="POST" action="login.php">
            <div class="input-group">
                <input type="email" name="email" placeholder="Email" value="<?= htmlspecialchars($email) ?>">
                <i class="fa-solid fa-user"></i>
            </div>

            <div class="input-group">
                <input type="password" name="password" placeholder="Password">
                <i class="fa-solid fa-lock"></i>
            </div>

            <button type="submit" id="loginBtn">LOGIN</button>
        </form>

        <p>
            <a href="register.php">Don't have an account yet? <span id="signUp">Sign Up</span></a>
        </p>
    </div>
</body>

</html>
